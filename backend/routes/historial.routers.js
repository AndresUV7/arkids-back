const express = require('express');
const router = express.Router();
const historial = require('../controllers/historial.controller');

router.post('/historial', historial.getHistorial);

module.exports = router