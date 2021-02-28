const mongoose = require('mongoose')
const { Schema } = mongoose;

const Curso = new Schema({
    
    nombre : {type: String, required: true},
    descripcion : {type: String, required: true},
    estado : {type: Number,  required: true, default:1}

})

module.exports = mongoose.model('Curso', Curso);