var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var Sequelize = require('sequelize');

router.get('/',function(req, res, next) {
  
      modelos.sequelize.query('SELECT b.id, te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, b.fecha_solicitud, b.estado, b.observacion, b.fecha_inicio, b.fecha_fin, b.id_empleado FROM public."Tipo_boleta" te, public."Empleados" e, public."Boleta" b where e.id='+res.locals.user.empleado.id+' and te.id=b.id_tipo_boleta and b.id_empleado=e.id ').spread((boletas, metadata) => {
        //console.log('\x1b[33m%s\x1b[0m',JSON.stringify(boletas));
        res.render('boleta/listadoboleta', { boletas: boletas,  moment:moment });
      })
});

router.post('/buscar', (req, res) => {
  const Op = Sequelize.Op;


      if(req.body.fecha_inicio<req.body.fecha_fin){

        modelos.sequelize.query('SELECT b.id, te.tipo_boleta, e.ndi,e.paterno, e.materno,b.observacion, b.dias, e.nombres, b.fecha_solicitud, b.estado, b.fecha_inicio, b.fecha_fin, b.id_empleado FROM public."Tipo_boleta" te, public."Empleados" e, public."Boleta" b where e.id='+res.locals.user.empleado.id+' and te.id=b.id_tipo_boleta and b.id_empleado=e.id  and b.fecha_solicitud BETWEEN '+ "'"+req.body.fecha_inicio+"'"+' AND '+"'"+req.body.fecha_fin+"'").spread((boletas, metadata) => {
          console.log('\x1b[33m%s\x1b[0m',JSON.stringify(boletas));
          res.render('boleta/listadoboleta', { boletas: boletas,  moment:moment });
        })
    
      }
      else{
        req.flash('error_msg','La fecha inicio no puede ser mayor a la fecha fin');
        res.redirect('/boleta/listadoboleta')
      }
});

router.post('/imprimir', (req, res) => {

 modelos.sequelize.query('select b.id, b.fecha_solicitud, b.estado, b.fecha_inicio, b.fecha_fin, b.dias, e.ndi, e.paterno, e.materno, e.nombres, tb.tipo_boleta, ca.cargo, a.desc_area from public."Boleta" b, public."Empleados" e, public."Tipo_boleta" tb, public."Contratos" c, public."Cargos" ca, public."Areas" a where b.id='+req.body.id+'and e.id = b.id_empleado and tb.id= b.id_tipo_boleta and e.id= c.id_empleado and c.id_cargo= ca.id and ca.id_area= a.id limit 1').spread((datos_boleta, metadata) => {
  
  console.log('\x1b[33m%s\x1b[0m',JSON.stringify(datos_boleta));
  const fecha_solicitud = moment(datos_boleta[0].fecha_solicitud).format("YYYY-MM-DD" +' '+ 'HH:mm');
  const fecha_inicio = moment(datos_boleta[0].fecha_inicio).format("YYYY-MM-DD" +' '+ 'HH:mm');
  const fecha_fin = moment(datos_boleta[0].fecha_fin).format("YYYY-MM-DD" +' '+ 'HH:mm');
  
res.render('boleta/reportetabla',{boleta:datos_boleta, variable1:fecha_solicitud,variable2:fecha_inicio,variable3:fecha_fin })


 })
});

module.exports = router;