const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
var modelos = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// Local Strategy
/*
passport.use(new LocalStrategy((username,password,done) => {
  return done(null, 'usuario');
}));
*/
// Local Processing
router.post('/login', (req, res, next) => {

  // const username = req.body.username;
  // const passport = req.body.password;

  req.checkBody('username', 'Usuario es requerido').notEmpty();
  req.checkBody('password', 'Password es requerido').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    res.render('login',{
      errors: errors
    });
  }else{
    modelos.Usuario.findOne({
      where: {
      username: req.body.username
      },
      include: [ 'rol' ]
  }).then(function(usuario) {
    if(usuario == null){
      console.log('No se encontro usuario');
    }else{
      console.log(usuario);
    }

  });
  }
});
module.exports = router;