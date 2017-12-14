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
    
        modelos.sequelize.query('SELECT * FROM public."Areas"').spread((Area, metadata) => {
        res.render('parametro/lista_area',{Area:Area}); 
        })
    });

router.post('/modificar', (req, res) => {

      let updateArea = { 
  
              id_area_superior: req.body.tipo_area, 
              desc_area : req.body.descripcion,
              estado : (req.body.estado=='on'?'TRUE':'FALSE'),
              nivel: req.body.nivel,
            
              
          };
          modelos.Area.update(updateArea, { where: { id: req.body.id_area } }).then((result) => {
    
              req.flash('success_msg','Area modificada correctamente');
             res.redirect('/lista_area');
  
          })
  
          });

router.get('/editar/:id_area', (req, res) => {

    console.log('entroo');
  modelos.sequelize.query('select * from public."Areas" where id='+req.params.id_area).spread((area, metadata) => {
   
      modelos.Area.findAll({
    
     }).then((combo_area) => {

      res.render('parametro/editar_area', {area:area, Area:combo_area})

           })
  })

});

module.exports = router;