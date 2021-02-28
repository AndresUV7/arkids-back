const mongoose = require('mongoose')
const { Schema } = mongoose;
const idvalidator = require('mongoose-id-validator');

const Usuario = new Schema({

    _id: {
        type: Schema.Types.String,
        ref: "TipoUsuario",
        required: true
    },
    contrasena : {type: String, required: true},
    sesiones: [{
        type: Schema.Types.ObjectId,
        ref: "Sesion",
        required: true,
      }],
    estado : {type: Number, required: true, default:1} 

})

Usuario.plugin(idvalidator);

module.exports = mongoose.model('Usuario', Usuario);

