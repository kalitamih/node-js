const express = require('express');

const peopleController = require('../controllers/people');

const selectController = require('../controllers/select');

const router = express.Router();

router.post('/', peopleController.postAddPeople);

router.post('/select', selectController.postAddSelect);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
