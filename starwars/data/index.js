const fetch = require('node-fetch');

const nameSet = new Set();
const birthYearSet = new Set();
const eyeColorSet = new Set();
const genderSet = new Set();
const hairColorSet = new Set();
const heightSet = new Set();
const massSet = new Set();
const skinColorSet = new Set();

const selectObj = {
  name: nameSet,
  birth_year: birthYearSet,
  eye_color: eyeColorSet,
  gender: genderSet,
  hair_color: hairColorSet,
  height: heightSet,
  mass: massSet,
  skin_color: skinColorSet,
  count: 0,
};

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};
const method = 'POST';
const chunk = 10;

let amountPerson;

const retrieveData = (resource) => {
  const url = `https://swapi.co/api/${resource}/`;
  fetch(url)
    .then(body => body.json())
    .then((data) => {
      const { count } = data;
      amountPerson = count;
      return Math.ceil(count / chunk);
    })
    .then((chunkCount) => {
      const reqArr = [];
      for (let i = 1; i <= chunkCount; i += 1) {
        reqArr.push(
          fetch(`${url}?page=${i}`)
            .then(body => body.json())
            .then(data => data.results),
        );
      }
      return reqArr;
    })
    .then(promisesArr => (
      new Promise((resolve, reject) => {
        promisesArr.map(
          promiseResults => promiseResults.then(results => results.map(
            (person) => {
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
              selectObj.count += 1;

              if (selectObj.count === amountPerson) resolve(selectObj);

              fetch('http://localhost:3000', {
                method,
                headers,
                body: JSON.stringify(person),
              });
            },
          )),
        );
      })
    ))
    .then((data) => {
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i] !== 'count') {
          data[keys[i]] = Array.from(data[keys[i]]);
        }
      }

      fetch('http://localhost:3000/select/', {
        method,
        headers,
        body: JSON.stringify(data),
      });

    });
};

retrieveData('people');
