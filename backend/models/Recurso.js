const mongoose = require('mongoose')
const { Schema } = mongoose;

const Recurso = new Schema({
    
    nombre : {type: String, required: true},
    ruta : {type: String, required: true},
    escala : {type: String},
    tipo : {type: Number, required: true},
    marcador: {type: String},
    estado : {type: Number,  required: true, default:1}

})

module.exports = mongoose.model('Recurso', Recurso);