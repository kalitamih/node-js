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
