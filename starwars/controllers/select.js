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

exports.getSelect = (req, res, next) => {
  Select.find()
    .exec()
    .then((docs) => {
      console.log(docs[0]);
      const array = [''];
      res.render('select', {
        name: JSON.stringify([...array, ...docs[0].name]),
        birthYear: JSON.stringify([...array, ...docs[0].birth_year]),
        eyes: JSON.stringify([...array, ...docs[0].eye_color]),
        gender: JSON.stringify([...array, ...docs[0].gender]),
        hair: JSON.stringify([...array, ...docs[0].hair_color]),
        mass: JSON.stringify([...array, ...docs[0].hair_color]),
        skin: JSON.stringify([...array, ...docs[0].hair_color]),
      });
    })
    .catch(err => console.log(err));
};
