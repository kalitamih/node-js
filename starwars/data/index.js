const fetch = require('node-fetch');
const flatten = require('array-flatten');
const mongoose = require('mongoose');
const People = require('../models/people');
const Select = require('../models/select');
const constants = require('../constants');

const { LINK_MONGODB, LINK_SWAPI, LINK_SERVER } = constants;

const { handleErrors } = require('./handleErrors');

const { selectObj } = require('./selectObj');

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};
const method = 'POST';
const chunk = 10;

mongoose.connect(LINK_MONGODB, { useNewUrlParser: true }).then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not Connected to Database ERROR!', err);
});

const getCountRequests = url => ( // Count amount request to fetch data from swapi.com
  fetch(url)
    .then(response => handleErrors(response))
    .then(body => body.json())
    .then((data) => {
      const { count } = data;
      console.log('Amount of people was fetched');
      return Math.ceil(count / chunk);
    })
    .catch(err => (console.log(`Information about amount character not fetched. ${err}`)))
);

const createRequests = (count, url) => { // Creator request to fetch data from swapi.com
  const requestArray = [];
  for (let i = 1; i <= count; i += 1) {
    requestArray.push(
      fetch(`${url}?page=${i}`)
        .then(response => handleErrors(response))
        .then(body => body.json())
        .then(data => data.results)
        .catch(err => (console.log(`Data weren't fetched from chunk=${i}. ${err}`))),
    );
  }
  return Promise.all(requestArray);
};

const createSelectObj = (person) => { // Collect unique data to display in select options
  const {
    name, birth_year, eye_color,
    gender, hair_color, height,
    mass, skin_color,
  } = person;

  selectObj.name.add(name);
  selectObj.birth_year.add(birth_year);
  selectObj.eye_color.add(eye_color);
  selectObj.gender.add(gender);
  selectObj.hair_color.add(hair_color);
  selectObj.height.add(height);
  selectObj.mass.add(mass);
  selectObj.skin_color.add(skin_color);

  return null;
};

const reqAddRecords = arr => ( // Add info about character in MongoDB (collection)
  arr.map((person) => {
    createSelectObj(person);
    return fetch(LINK_SERVER, {
      method,
      headers,
      body: JSON.stringify(person),
    })
      .then(response => handleErrors(response))
      .catch(err => (console.log(`Data about ${person.name} not added in MongoDB. ${err}`)));
  })
);

const saveSelectObject = () => { // Save object to create select options
  const keys = Object.keys(selectObj);

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== 'count') {
      selectObj[keys[i]] = Array.from(selectObj[keys[i]]);
    }
  }

  return Select.deleteMany({})
    .then(() => {
      console.log('Previous select object was removed from database succesfully');
      return null;
    })
    .then(
      fetch(`${LINK_SERVER}select/`, {
        method,
        headers,
        body: JSON.stringify(selectObj),
      })
        .then(response => handleErrors(response))
        .then(() => console.log('Select object was added in MongoDB'))
        .catch(err => (console.log(`Select object not added in MongoDB. ${err}`))),
    );
};

const putDataInDatabase = (resource) => { // Main function, which combine all steps
  const url = `${LINK_SWAPI}${resource}/`;

  People.deleteMany({}) // Clear collection 'people' before update data from swapi.co
    .then(() => {
      console.log('Data of peoples were removed from database succesfully');
      return getCountRequests(url);
    })
    .then(chunkCount => (
      createRequests(chunkCount, url)
    ))
    .then(data => flatten(data))
    .then(data => (
      reqAddRecords(data)
    ))
    .then(() => (
      saveSelectObject()
    ))
    .catch(err => `Something went wrong. ${err}`);
};

putDataInDatabase('people');
