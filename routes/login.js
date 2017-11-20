const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var modelos = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

// Local Strategy

passport.use(new LocalStrategy((username, password, done) => {
    modelos.Usuario.findOne({
        where: {
            username: username
        },
        include: ['rol']
    }).then(function(usuario) {
        console.log(JSON.stringify(usuario));
        if (usuario == null) {
            return done(null, false, { message: 'Usuario o Password incorrecto' });
        }
        bcrypt.compare(password, usuario.password, function(err, resp) {
            if (err) throw err;
            if (resp) {
                return done(null, usuario);
            } else {
                return done(null, false, { message: 'Usuario o Password incorrecto' });
            }

        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    modelos.Usuario.findOne({
        where: {
            id: id
        },
        include: ['rol']
    }).then(usuario => {
        done(null, usuario);
    });
});

// Local Processing
router.post('/login', (req, res, next) => {

    // const username = req.body.username;
    // const passport = req.body.password;

    req.checkBody('username', 'Usuario es requerido').notEmpty();
    req.checkBody('password', 'Password es requerido').notEmpty();

    let errors = req.validationErrors();
    if (errors) {
        res.render('login', {
            errors: errors
        });
    } else {
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next)

    }
});

//Logout
router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'Sesion Terminada');
    res.redirect('/');
});

function ensureAuthentificated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;