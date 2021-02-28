const Juego = require("../models/Juego");
const juegoCtrl = {};

juegoCtrl.getJuegos = async (req, res) => {
  const juegos = await Juego.find();

  res.json(juegos);
};


juegoCtrl.getJuegos2 = async (req, res) => {
  const juegos = await Juego.find({ 'usuario' : req.body.usuario}, {'partidas.detalles_partida':0, 'recursos':0});

  res.json(juegos.reverse());
};


juegoCtrl.getJuego = async (req, res) => {
  const juego = await Juego.findById(req.params.id);
  res.json(juego);
};

juegoCtrl.createJuego = async (req, res) => {
  
  const encontrado = await Juego.findOne({usuario:req.body.usuario, nombre: req.body.nombre});
  
  if(!encontrado){
    const juego = new Juego(req.body);
    await juego.save();
    res.json(
       juego
    );
  }else{
    res.json(
      encontrado
   );
  }

 
};

juegoCtrl.updateJuego = async (req, res) => {
  const { id } = req.params;
  let juego = new Juego(req.body);
  juego.updated = new Date();

  await Juego.findByIdAndUpdate(id, { $set: juego }, { new: true }).then(
    (doc) => {
      res.json(
        doc
      );
    }
  );
};

module.exports = juegoCtrl;
