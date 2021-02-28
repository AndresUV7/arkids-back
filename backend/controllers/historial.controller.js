const Historial = require("../models/Historial");

const historialCtrl = {};

historialCtrl.getHistorial = async (req, res) => {
    const historial = await Historial.find({ 'd.usuario' : req.body.user_id}, {'d.partidas':0, 'd.recursos':0});
    res.json(historial.reverse());
  };
  
module.exports = historialCtrl;