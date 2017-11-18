var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

// Consultas de boletas por empleado
router.get('/formulario', function(req, res, next) {

  //cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
  modelos.sequelize.query('SELECT tb.id, tb.tipo_boleta FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te, public."Tipo_empleado_boleta" teb, public."Tipo_boleta" tb WHERE e.id = c.id_empleado and c.id_empleado= te.id and c.id_tipo_empleado=teb.id_tipo_empleado and  teb.id_tipo_boleta=tb.id and c.id_empleado='+res.locals.user.id).spread((Tipo_boleta, metadata) => {
    console.log(Tipo_boleta);
    res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
  })
  });

    router.post('/guardar', (req, res) => {
      console.log(req.body);
      
            const fecha_solicitud = moment().format("YYYY-MM-DD"+" 00:00:00.000 +00:00");
            const observacion = '';
            const estado = 'PENDIENTE';
            const fecha_inicio = req.body.fecha_inicio;
            const  fecha_fin = req.body.fecha_fin;
            const id_empleado = res.locals.user.id;
            const id_tipo_boleta= req.body.tipo_boleta;
       
              if(fecha_inicio<fecha_fin){
       
                modelos.Boleta.create({
                  fecha_solicitud : fecha_solicitud,
                  observacion : observacion,
                  estado :estado,
                  fecha_inicio : fecha_inicio,
                  fecha_fin : fecha_fin,
                  id_empleado : id_empleado,
                  id_tipo_boleta: id_tipo_boleta,
          
                })
                  .then(newboleta => {
                    res.json(newboleta);
                  })
                
                }else{
                  req.flash('error_msg','La fecha inicio no puede ser mayor a la fecha fin');
                  res.redirect('/boleta/formulario');
            }
              //res.json('boleta/boleta');
        });
      

  module.exports = router;


