const People = require('../models/people');

exports.postAddPeople = (req, res) => {
  const {
    name, birth_year, eye_color,
    gender, hair_color, height,
    mass, skin_color, homeworld,
    films, species, starships,
    vehicles, url, created, edited,
  } = req.body;
  const people = new People({
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    skin_color,
    homeworld,
    films,
    species,
    starships,
    vehicles,
    url,
    created,
    edited,
  });
  people
    .save()
    .then(() => {
      res.status(201).send('Record about person was created');
    })
    .catch((err) => {
      console.log(`Record about person wasn't created. ${err}`);
      res.status(500).send(`Record about person wasn't created. ${err}`);
    });
};

exports.postDisplayPeople = (req, res) => {
  const reqObj = JSON.parse(JSON.stringify(req.body));

  const keys = Object.keys(reqObj);

  keys.forEach((key) => {
    if (!reqObj[key]) delete reqObj[key];
  });

  People
    .find(reqObj)
    .then((people) => {
      if (people.length) {
        res.render('people', {
          people: JSON.stringify(people),
        });
      } else {
        res.render('nothing');
      }
    })
    .catch(() => {
      res.status(500).render('error');
    });
};
