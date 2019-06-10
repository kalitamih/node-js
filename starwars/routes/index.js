const express = require('express');

const peopleController = require('../controllers/people');

const router = express.Router();

router.post('/', peopleController.postAddPeople);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
