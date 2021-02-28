const mongoose = require('mongoose')
const { Schema } = mongoose;

const TipoUsuario = new Schema({

    _id : {type: String, required: true, unique: true},
    descripcion : {type: String, required: true},
    estado : {type: Number, required: true,  default:1}

}, { collection: 'tipos_usuario' })

module.exports = mongoose.model('TipoUsuario', TipoUsuario);