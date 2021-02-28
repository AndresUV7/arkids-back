const TipoUsuario = require('../models/TipoUsuario')

const TipoUsuarioCtrl = {};

TipoUsuarioCtrl.getTiposUsuario = async (req, res) => {
    const tiposUsuario =  await TipoUsuario.find();
    res.json(tiposUsuario);
}

TipoUsuarioCtrl.getTipoUsuario = async (req, res) => {
    const tipoUsuario = await TipoUsuario.findById(req.params.id);
    res.json(tipoUsuario);
}

TipoUsuarioCtrl.createTipoUsuario = async (req, res) => {
    const tipoUsuario = new TipoUsuario(req.body);
    await tipoUsuario.save();
    res.json({
        'satus': "OK"
    });
}

TipoUsuarioCtrl.updateTipoUsuario = async (req, res) => {
    const { id } = req.params;
    const tipoUsuario = {
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    await TipoUsuario.findByIdAndUpdate(id, {$set: tipoUsuario}, {new: true});
    res.json({
        'satus': "OK"
    });
}

module.exports = TipoUsuarioCtrl;