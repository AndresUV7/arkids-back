const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Persona = require('../models/Persona')

passport.use(
    new localStrategy({ usernameField: 'cedula', passwordField: 'contrasena' },
        (cedula, contrasena, done) => {
            Persona.findOne({ cedula: cedula , usuario : { $exists: true}, estado: 1},
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Usuario no registrado' });
                    // wrong password
                    else if (!user.verifyPassword(contrasena))
                        return done(null, false, { message: 'Contrseña incorrecta.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);