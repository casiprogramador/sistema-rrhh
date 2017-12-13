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

router.get('/', md_auth.ensureAuth, function(req, res, next) {
  
modelos.Horario.findAll({
             
        }).then((horario) => {
        
            where: {
                  estado: true
              }
    
        res.render('horario/lista_asignacion_horario_especial', {horario:horario})
    
            })

  });

router.post('/modificar', (req, res) => {

      let updateEmpleado = { 
  
              id_horario : req.body.tipo_horario
              
          };
          modelos.Empleado.update(updateEmpleado, { where: { ndi: req.body.ndi } }).then((result) => {
    
              req.flash('success_msg','Horario del usuario modificado correctamente');
             res.redirect('/horario/lista_asignacion_horario');
  
          })
  
          });

module.exports = router;