const Sesion = require('../models/Sesion')

const sesionCtrl = {};

sesionCtrl.createSesion = async (req, res) => {
    const sesion = new Sesion(req.body);
    await sesion.save().then( doc => {
        res.json({
            data : doc
        });
    });
    
}

sesionCtrl.getSesiones = async (req, res) => {
    const sesiones =  await Sesion.find();
    res.json(sesiones);
}

module.exports = sesionCtrl;