const express = require('express');

const peopleController = require('../controllers/people');

const selectController = require('../controllers/select');

const router = express.Router();

router.get('/', selectController.getSelect);

router.post('/people', peopleController.postDisplayPeople);

module.exports = router;
