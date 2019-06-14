const People = require('../models/people');
const constants = require('../constants');

const { LINK_SERVER } = constants;

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
          link: LINK_SERVER,
        });
      } else {
        res.render('nothing', {
          link: LINK_SERVER,
        });
      }
    })
    .catch(() => {
      res.status(500).render('error', {
        link: LINK_SERVER,
      });
    });
};
