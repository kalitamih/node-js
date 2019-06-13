const Select = require('../models/select');

const constants = require('../constants');

const { LINK_SERVER } = constants;

exports.postAddSelect = (req, res) => {
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
      console.log('Collection \'select\' was created');
      res.status(201).send('Collection \'select\' was created');
    })
    .catch((err) => {
      console.log(`Collection 'select' not created. ${err}`);
      res.status(500).send(`Collection 'select' not created. ${err}`);
    });
};

exports.getSelect = (req, res) => {
  Select.find()
    .exec()
    .then((docs) => {
      const array = [''];
      const [select] = docs;

      const yearRegex = /^[\d]{1,4}BBY$|^$/;
      const heightRegex = /^\d{1,3}$|^$/;
      const massRegex = /^[\d.,]{1,5}$|^$/;

      res.render('select', {
        name: JSON.stringify([...array, ...select.name]),
        birthYear: JSON.stringify(
          [...array, ...select.birth_year].filter(item => yearRegex.test(item)),
        ),
        eyes: JSON.stringify([...array, ...select.eye_color]),
        gender: JSON.stringify(['', 'male', 'female', 'hermaphrodite']),
        hair: JSON.stringify([...array, ...select.hair_color]),
        mass: JSON.stringify(
          [...array, ...select.mass].filter(item => massRegex.test(item)),
        ),
        skin: JSON.stringify([...array, ...select.skin_color]),
        height: JSON.stringify(
          [...array, ...select.height].filter(item => heightRegex.test(item)),
        ),
        link: `${LINK_SERVER}people`,
      });
    })
    .catch(() => {
      res.status(500).render('error', {
        link: LINK_SERVER,
      });
    });
};
