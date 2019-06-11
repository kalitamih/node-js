const Select = require('../models/select');

exports.postAddSelect = (req, res, next) => {
  const {
    name, birth_year, eye_color,
    gender, hair_color, height,
    mass, skin_color, count,
  } = req.body;
  const people = new Select({
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    skin_color,
    count,
  });
  people
    .save()
    .then(() => {
      console.log('Created Select');
    })
    .catch((err) => {
      console.log(err);
    });
};
