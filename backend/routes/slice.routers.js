const express = require('express');
const router = express.Router();
const slice = require('../controllers/slice.controller');

router.get('/slice', slice.test);

module.exports = router