const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Sesion = new Schema(
  {
    codigo: { type: Number },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    tipo_dispositivo: { type: Number, required: true },
    estado: { type: Number, required: true, default: 1 },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Persona",
      required: true,
    },
  },
  { collection: "sesiones" }
);

Sesion.plugin(AutoIncrement, { id: "sesion_seq", inc_field: "codigo" });

module.exports = mongoose.model("Sesion", Sesion);
