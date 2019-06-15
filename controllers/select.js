
const Select = require('../models/select');

const constants = require('../constants');

const { LINK_SERVER } = constants;

exports.getSelect = (req, res) => {
  Select.find()
    .exec()
    .then((docs) => {
      const [select] = docs;

      const yearRegex = /^[\d]{1,4}BBY$|^$/;
      const heightRegex = /^\d{1,3}$|^$/;
      const massRegex = /^[\d.,]{1,5}$|^$/;

      res.render('select', {
        name: JSON.stringify(select.name),
        birthYear: JSON.stringify(select.birth_year.filter(item => yearRegex.test(item))),
        eyes: JSON.stringify(select.eye_color),
        gender: JSON.stringify(select.gender),
        hair: JSON.stringify(select.hair_color),
        mass: JSON.stringify(select.mass.filter(item => massRegex.test(item))),
        skin: JSON.stringify(select.skin_color),
        height: JSON.stringify(select.height.filter(item => heightRegex.test(item))),
        link: `${LINK_SERVER}people`,
      });
    })
    .catch(() => {
      res.status(500).render('error', {
        link: LINK_SERVER,
      });
    });
};
