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
    
        modelos.sequelize.query('select c.id, c.cargo, a.desc_area, es.denominacion_puesto, es.sueldo_mensual from public."Cargos" c, public."Areas" a, public."Escala_Salarials" es where c.id_area= a.id and c.id_escala_salarial = es.id').spread((Cargo, metadata) => {
        res.render('parametro/lista_cargo',{Cargo:Cargo}); 
        })
    });

router.post('/modificar', (req, res) => {

      let updateCargo = { 
  
              cargo: req.body.descripcion, 
              id_area : req.body.tipo_area,
              id_escala_salarial : req.body.tipo_escala,             
          };
          modelos.Cargo.update(updateCargo, { where: { id: req.body.id } }).then((result) => {
    console.log(req.body.id);
              req.flash('success_msg','Cargo modificado correctamente');
             res.redirect('/lista_cargo');
  
          })
  
          });

router.get('/editar/:id_cargo', (req, res) => {

    console.log('entroo');
  modelos.sequelize.query('select c.id, c.cargo,c.id_area, c.id_escala_salarial, a.desc_area, es.denominacion_puesto, es.sueldo_mensual from public."Cargos" c, public."Areas" a, public."Escala_Salarials" es where c.id_area= a.id and c.id_escala_salarial = es.id and c.id='+req.params.id_cargo).spread((cargo, metadata) => {
   
      modelos.Area.findAll({
    
     }).then((combo_area) => {

        modelos.Escala_Salarial.findAll({
            
             }).then((combo_escala) => {
          res.render('parametro/cargo', {Escala:combo_escala, Area:combo_area, cargo:cargo})

           })
        })
  })

});

module.exports = router;