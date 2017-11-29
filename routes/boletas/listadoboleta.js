var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var Sequelize = require('sequelize');
var moment = require('moment');
/**
 * Vista principal de administracion de boletas 
 * Administrador
 */
router.get('/',function(req, res, next) {
  modelos.Boleta.findAll({
    where: {
      estado: 'Pendiente',
    },
    include: ['empleado','tipoboleta']
 }).then((boletas) => {
   //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(boletas));
         res.render('boleta/listadoboleta',{boletas:boletas, moment:moment});   
       })
});
    
router.post('/buscar', (req, res) => {
  /**
  const Op = Sequelize.Op;
      if(req.body.fecha_inicio<req.body.fecha_fin){
        if(req.body.estado!='todos'){
             modelos.Boleta.findAll({
                 include: ['empleado'],
                  where: {
                    estado: req.body.estado,
                    fecha_solicitud: {
                      [Op.between]: [req.body.fecha_inicio+" 00:00:00.000 +00:00",req.body.fecha_fin+" 00:00:00.000 +00:00"]
                  
                    }}
              }).then((boletas) => {
                console.log(boletas);
                      res.render('administrar/boleta',{boletas:boletas});   
   
                    })
        }
        else{
          modelos.Boleta.findAll({
            where: {
              fecha_solicitud: {
                [Op.between]: [req.body.fecha_inicio+" 00:00:00.000 +00:00",req.body.fecha_fin+" 00:00:00.000 +00:00"]
              }  
            }
          }).then((boletas) => {
        res.render('administrar/boleta', { boletas: boletas });
        })
        }
      }
      else{
        req.flash('error_msg','La fecha inicio no puede ser mayor a la fecha fin');
        res.redirect('/administrar/boleta')
      }
  **/
  if(req.body.estado == 'Todos'){
    modelos.Boleta.findAll({
      include: ['empleado','tipoboleta'],
    }).then((boletas) => {
      res.render('boleta/listadoboleta', { boletas: boletas, moment:moment });
    })
  }else{
    modelos.Boleta.findAll({
      where: {
        estado: req.body.estado,
      },
      include: ['empleado','tipoboleta'],
    }).then((boletas) => {
      
      res.render('boleta/listadoboleta', { boletas: boletas, moment:moment });
    })
  }
});
router.post('/estado', (req, res) => {
 console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(req.body));
 let actualizarBoleta = { estado: req.body.estado_boleta, observacion: req.body.observacion,usuario_anulacion_aprobacion:res.locals.user.id, fecha_anulacion_aprobacion:moment().format() };
 modelos.Boleta.update(actualizarBoleta, { where: { id: req.body.id_boleta } }).then((updateboleta) => {
     
     modelos.Saldo_Vacacion.findOne({
      where: {
        id_empleado: req.body.id_empleado,
        prescrito_estado: false
      },
      order: [
        ['gestion', 'ASC'],
      ]
      }).then((saldovacacion) => {
           //res.render('administrar/boleta',{boletas:boletas, moment:moment});
          
          var dias_vacacion = req.body.dias_vacacion;
          var dias_vacacion_saldo = saldovacacion.dias;
          var dias_vacaciones_actualizar = saldovacacion.dias;
          
          if(req.body.estado_boleta == 'Aprobado'){
            var dias_vacaciones_actualizar = dias_vacacion_saldo-dias_vacacion;
            console.log('\x1b[33m%s\x1b[0m: ','DIAS:'+dias_vacaciones_actualizar);
            
          }
          
          let updateValues = { dias: dias_vacaciones_actualizar};
          
          modelos.Saldo_Vacacion.update(updateValues, { where: { id: saldovacacion.id } }).then((result) => {
    
              console.log(result);
              req.flash('success_msg','Boleta actualizada correctamene');
              res.redirect('/boleta/listadoboleta')
          });
      })
 });
});
module.exports = router;