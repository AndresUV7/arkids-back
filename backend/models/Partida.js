const mongoose = require('mongoose')
const { Schema } = mongoose;
const DetallePartida = require('./DetallePartida');

// const AutoIncrement = require('mongoose-sequence')(mongoose);

const Partida= new Schema({

    fecha_inicio: {type: String, default: new Date()},
    fecha_fin : {type: Date},
    detalles_partida : [DetallePartida.schema],
    estado : {type: Number,  required: true,  default:1}
    
})

// Partida.plugin(AutoIncrement, {id:'partida_seq',inc_field: '_id'});

module.exports = mongoose.model('Partida', Partida);