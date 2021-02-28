const express = require('express');
const router = express.Router();
const juego = require('../controllers/juego.controller');

router.get('/juegos', juego.getJuegos);
router.post('/juego', juego.createJuego);
router.post('/juegos2', juego.getJuegos2);
router.get('/juegos/:id', juego.getJuego);
router.put('/juego/:id', juego.updateJuego);

module.exports = router