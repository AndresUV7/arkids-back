const mongoose = require("mongoose");
const Usuario = require("./Usuario");
const Curso = require("./Curso");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongooseHistory = require('mongoose-history')
const { Schema } = mongoose;

const Persona = new Schema(
  {
    cedula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    sexo: { type: String, required: true, maxlength: 1 },
    usuario: Usuario.schema,
    email: { type: String, required: true },
    curso: Curso.schema,
    observaciones: { type: String },
    estado: { type: Number, required: true, default: 0 },
  },
  { collection: "personas" , versionKey: '__version'}
);

Persona.methods.verifyPassword = function (contrasena) {
  return bcrypt.compareSync(contrasena, this.usuario.contrasena);
};

Persona.methods.generateJwt = function () {
  console.log(this.cedula);
  return jwt.sign({ id: this.cedula }, "secretkey1234", {
    expiresIn: "5m",
  });
};

const options = {customCollectionName: "personas_audit"}

Persona.plugin(mongooseHistory, options)


module.exports = mongoose.model("Persona", Persona);
