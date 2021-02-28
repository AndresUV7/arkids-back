const mongoose = require('mongoose');
const Partida = require('./Partida');
const Recurso = require('./Recurso');
const { Schema } = mongoose;
const idvalidator = require('mongoose-id-validator');
const mongooseHistory = require('mongoose-history')


const Juego = new Schema({

    nombre : {type: String, required: true},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Persona",
        required: true
    },
    descripcion : {type: String, required: true},
    partidas: [Partida.schema],
    recursos : [Recurso.schema],
    updated: {type: String, required: true, default: new Date()},
    estado : {type: Number,  required: true, default:1},
    
}, { collection: 'juegos' , versionKey: '__version' })

const options = {customCollectionName: "juegos_audit"}
Juego.plugin(mongooseHistory,options);
Juego.plugin(idvalidator);

module.exports = mongoose.model('Juego', Juego);