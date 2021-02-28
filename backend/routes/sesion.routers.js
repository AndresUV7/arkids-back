const express = require('express');
const router = express.Router();
const sesion = require('../controllers/sesion.controller');

router.post('/sesion', sesion.createSesion);
router.get('/sesiones', sesion.getSesiones);

module.exports = router