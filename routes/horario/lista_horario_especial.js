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
  
      //cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
      modelos.sequelize.query('select e.id,e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id').spread((Empleado, metadata) => {
      res.render('horario/lista_horario_especial', { Empleado: Empleado});
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

router.get('/editar/:id_horario', (req, res) => {

  modelos.sequelize.query('select e.id, e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.id='+req.params.id_horario).spread((horario, metadata) => {
   
      modelos.Horario.findAll({
        where: {
            estado: true
        }
    
     }).then((combo_horario) => {

      res.render('horario/asignar_horario_especial', {horario:horario, combo_horario:combo_horario})

           })
  })

});

router.get('/ver/:id_horario', (req, res) => {
    
      modelos.sequelize.query('select e.id, e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.id='+req.params.id_horario).spread((horario, metadata) => {
       
        modelos.sequelize.query('select he.id, he.fecha, h.descripcion, h.min_entrada_1, h.max_entrada_1, h.min_salida_1, h.max_salida_1, h.min_entrada_2, h.max_entrada_2, h.min_salida_2, h.max_salida_2 from   public."Horario_especials" he, public."Horarios" h where he.id_empleado ='+req.params.id_horario).spread((horario2, metadata) => {
        res.render('horario/asignar_horario_especial_usuario', {horario:horario, horario2:horario2, moment:moment})
    
               })
      })
    
    });
    router.get('/eliminar/:id_horario',md_auth.ensureAuth, (req, res) => {
        const id = req.params.id_horario
        modelos.Horario_especial.destroy({  
          where: { id: id }
        })
        .then(delethorario => {
          
            //req.flash('success_msg','Horario eliminado correctamente');
            res.redirect('/horario/lista_horario_especial');
          })
      });

module.exports = router;