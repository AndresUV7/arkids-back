const Persona = require('../models/Persona')
const passwordResetToken = require('../models/Tokens')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const SECRET_KEY = "secretkey1234567";
const _ = require('lodash');
const nodemailer = require("nodemailer");
const crypto = require('crypto'); 
const personaCtrl = {};

personaCtrl.getPersonas = async (req, res) => {
    const personas =  await Persona.find({ estado: { $ne: -1 } });
    res.json(personas);
}

personaCtrl.getPersona = async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
}

personaCtrl.createPersona = async (req, res) => {

    let token = null;
    
    const persona = new Persona(req.body);
    if (persona.usuario){
        persona.usuario.contrasena = bcrypt.hashSync(req.body.usuario.contrasena, bcrypt.genSaltSync(10));
        token = persona.generateJwt();

    }
    try {
        await persona.save().then( doc => {
            res.json({
                id : doc._id,
                token :token
            });
        });
    } catch (error) {
        res.json({
            'satus': error
        });
    }
    
    
}

// personaCtrl.register = async(req, res) =>{
//     const { id } = req.params;

//     await Persona.findByIdAndUpdate(id, {$set: req.body}, {new: true});
//     res.json({
//         'satus': "OK"
//     });
// }

personaCtrl.registrarPersona = async (req, res) => {
    
    const { cedula } = req.params;

    let persona = {
        usuario:{
            _id : req.body.usuario._id,
            contrasena : req.body.usuario.contrasena
        },
    }

    persona.usuario.contrasena = bcrypt.hashSync(req.body.usuario.contrasena, bcrypt.genSaltSync(10));
    persona.estado = 1;
    const token = jwt.sign({ id: this.cedula }, "secretkey1234", {
        expiresIn: "30m",
      });

    const encontrado = await Persona.findOne({cedula:cedula, estado: { $ne: -1 } }, );

    if (encontrado){
        await Persona.findOneAndUpdate({cedula : cedula , estado : 0 }, {$set: persona}, {new: true}).then(doc => {
        
            if (doc){
                res.json({
                    _id : doc._id,
                    token :token
                });
            }else{
                res.json({
                    sms : "Usted ya se ha registrado"
                });
            }
        });
    }else{
        res.json({
            sms : "Usted no tiene acceso a esta plataforma"
        }); 
    }
    
   
    
}


personaCtrl.actualizarContrasena = async (req, res) => {
    
    const { cedula } = req.params;

    let persona = {
        usuario:{
            _id : req.body.usuario._id,
            contrasena : req.body.usuario.contrasena
        },
    }

    persona.usuario.contrasena = bcrypt.hashSync(req.body.usuario.contrasena, bcrypt.genSaltSync(10));
    persona.estado = 1;
    const token = jwt.sign({ id: this.cedula }, "secretkey1234", {
        expiresIn: "30m",
      });

    const encontrado = await Persona.findOne({cedula:cedula, estado: { $ne: -1 } }, );

    if (encontrado){
        await Persona.findOneAndUpdate({cedula : cedula , estado : 1 }, {$set: persona}, {new: true}).then(doc => {
        
            if (doc){

                
                res.json({
                    sms : "CORRECTO"
                });
            }else{
                res.json({
                    sms : "ERROR"
                });
            }
        });
    }else{
        res.json({
            sms : "Usted no tiene acceso a esta plataforma"
        }); 
    }

    // var resettoken = new passwordResetToken({ _userId: cedula, resettoken: crypto.randomBytes(16).toString('hex') });

    
    // await resettoken.save().then(doc => {
        
    //         console.log(doc)
    // });
  
    
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail', // true for 465, false for other ports
    //     auth: {
    //       user: 'arkids2021.info@gmail.com', // generated ethereal user
    //       pass: 'IpC@_2120', // generated ethereal password
    //     },
    //   });


    
    //   // send mail with defined transport object
    //   let info = await transporter.sendMail({
    //     from: 'arkids2021.info@gmail.com', // sender address
    //     to: "heroes.geek2021@gmail.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>"+resettoken.resettoken, // html body
    //   });
    
    //   console.log("Message sent: %s", info.messageId);
    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //   // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

   
    
}

personaCtrl.updatePersona = async (req, res) => {
    const { id } = req.params;
    const persona = new Persona(req.body);
    
  
    await Persona.findByIdAndUpdate(id, { $set: persona }, { new: true }).then(
      (doc) => {
        res.json(
          doc
        );
      }
    );
  };


personaCtrl.deletePersona = async (req, res) => {
    const { id } = req.params;
    const persona = new Persona(req.body);
    persona.estado = -1;
    console.log(persona);
    await Persona.findByIdAndUpdate(id, { $set: persona }, { new: true }).then(
      (doc) => {
        res.json(
          doc
        );
      }
    );
  };


personaCtrl.loginUsuario = async (req, res, next) => {
    // const expiresIn = 60;
    // const sms = "Contrasena o usuario incorrect@(s)";
    // const { cedula, contrasena } = req.body;
    // const persona = await Persona.findOne({ cedula });
    // if (!persona) return res.status(401).json({sms});
    // if (!bcrypt.compareSync(contrasena, persona.usuario.contrasena))
    //   return res.status(401).json({sms});
  
    // const token = JWT.sign({ id: persona.id }, SECRET_KEY, {
    //   expiresIn: expiresIn,
    // });
    // res.status(200).json({ token });
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        const sms = "Contraseña o usuario incorrect@(s)";
        if (err) return res.status(400).json(sms);
        // registered user
        else if (user) return res.status(200).json({ "_id": user._id,  "token": user.generateJwt(), "gender" : user.sexo});
        // unknown user or wrong password
        else return res.status(404).json(info.message);
    })(req, res);
  };
  
  personaCtrl.perfilUsuario = async (req, res, next) => {
    Persona.findOne({ cedula: req.body.cedula },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['nombre','fecha_nacimiento']) });
        }
    );
  };

module.exports = personaCtrl;