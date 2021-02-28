const express = require('express');
const router = express.Router();
const persona = require('../controllers/persona.controller');
const jwtHelper =  require('../passport/JWTHelper')

router.get('/personas', persona.getPersonas);
router.post('/persona', persona.createPersona);
router.get('/personas/:id', persona.getPersona);
router.put('/persona/:cedula', persona.registrarPersona);
router.put('/persona/contrasena/:cedula', persona.actualizarContrasena);
router.put('/persona/actualizar/:id', persona.updatePersona);
router.put('/persona/eliminar/:id', persona.deletePersona);
router.post('/login', persona.loginUsuario);
router.post('/profile', jwtHelper.verifyJwtToken, persona.perfilUsuario);

module.exports = router