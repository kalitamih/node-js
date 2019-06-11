const People = require('../models/people');

exports.postAddPeople = (req, res, next) => {
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
      console.log('Created Product');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDisplayPeople = (req, res, next) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  
  if (!obj.name) delete obj.name;
  if (!obj.mass) delete obj.mass;
  if (!obj.birth_year) delete obj.birth_year;
  if (!obj.eye_color) delete obj.eye_color;
  if (!obj.skin_color) delete obj.skin_color;
  if (!obj.hair_color) delete obj.hair_color;
  if (!obj.height) delete obj.height;

  console.log(obj);

  People
    .find(obj)
    .then((people) => {
      console.log(people);
      if (people.length) {
        res.render('people', {
          people: JSON.stringify(people),
        });
      } else {
        res.render('nothing');
      }
    });
};
