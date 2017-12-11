var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado

router.get('/', md_auth.ensureAuth, function(req, res, next) {
    
  modelos.Horario.findAll({
               
          }).then((horario) => {
          
              console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(horario));
      
          res.render('horario/asignar_horario_especial', {horario:horario})
      
              })
  

});







module.exports = router;