const express = require("express");
const https = require('https')
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("./passport/passportConfig");
const fs = require('fs')
const app = express();

const { mongoose } = require("./database");

//Settings
app.set("port", process.env.PORT || 3000);
// process.env.TZ = 'America/Guayaquil';

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Routes
app.use(require("./routes/juego.routers"));
app.use(require("./routes/persona.routers"));
app.use(require("./routes/sesion.routers"));
app.use(require("./routes/drive.routers"));
app.use(require("./routes/tipoUsuario.routers"));
app.use(require("./routes/slice.routers"));
app.use(require("./routes/historial.routers"));


//Starting the server
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log('Listening...')
})
// app.listen(app.get("port"), () => {
//   console.log("Servidor en puerto 3000");
// });
