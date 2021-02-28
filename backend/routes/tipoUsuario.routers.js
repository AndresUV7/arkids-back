const express = require('express');
const router = express.Router();
const tipoUsuario = require('../controllers/tipoUsuario.controller');

router.get('/tipos-usuario', tipoUsuario.getTiposUsuario);
router.post('/tipo-usuario', tipoUsuario.createTipoUsuario);
router.get('/tipos-usuario/:id', tipoUsuario.getTipoUsuario);
router.put('/tipo-usuario/:id', tipoUsuario.updateTipoUsuario);



module.exports = router