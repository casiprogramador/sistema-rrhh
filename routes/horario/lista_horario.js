var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var Sequelize = require('sequelize');
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');
/**
 * Vista principal de administracion de boletas 
 * Administrador
 */
router.get('/', md_auth.ensureAuth,function(req, res, next) {
  modelos.Horario.findAll({

 }).then((horario) => {
   
         res.render('horario/lista_horario',{horario:horario});   
       })
});

router.post('/nuevo', (req, res) => {

     res.render('horario/nuevo_horario')
  
});

router.get('/editar/:id_horario', (req, res) => {

  modelos.Horario.findOne({
    where: {
      id: req.params.id_horario,
    },
    
      }).then((horario) => {
 // console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(horario));

         res.render('horario/editar_horario',{horario:horario});   
            })
    
});

module.exports = router;