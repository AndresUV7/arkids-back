const mongoose = require('mongoose');
const Juego = require('./Juego');
const { Schema } = mongoose;

const Historial = new Schema({

    t : {type: Date, required: true},
    o : {type: String, required: true},
    d: Juego.schema,
    
}, { collection: 'juegos_audit' , versionKey: '__version' })

module.exports = mongoose.model('Historial', Historial);