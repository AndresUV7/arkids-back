const mongoose = require('mongoose')
const { Schema } = mongoose;

const DetallePartida= new Schema({

    ok : {type: Boolean,  required: true},
    objetivo : {type: String,  required: true},
    accion : {type: String,  required: true},
    estado : {type: Number,  default: 1}

})

module.exports = mongoose.model('DetallePartida', DetallePartida);