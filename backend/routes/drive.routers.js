const express = require('express');
const router = express.Router();
const drive = require('../controllers/drive.controller');
const firebase = require('../controllers/firebase.controller');

router.get('/drive', firebase.testFirebase);
router.get('/drive2', drive.postTest);

module.exports = router