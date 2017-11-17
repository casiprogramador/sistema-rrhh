var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');


/* GET login page. */
router.get('/formulario', function(req, res, next) {
  // console.log('USUARIO ID'+res.locals.user.id);
    
    modelos.Tipo_boleta.findAll({
        attributes: ['id', 'tipo_boleta']
    }).then(Tipo_boleta => {

         //console.log(JSON.stringify(Tipo_boleta));
        //console.log('holaaaaa => '+ req.body.Tipo_boleta);
        res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
    });
});
/*

router.post('/guardar', (req, res, next) => {
    
      // const username = req.body.username;
      // const passport = req.body.password;
     
      // console.log('USUARIO ID'+res.locals.user.id);

      
      

//Consulta de boletas por id_usuario
console.log(req.body.Tipo_boleta);
      console.log(req.body.fecha_inicio);
   
    });*/
    router.post('/guardar', (req, res) => {
      console.log(req.body);
      
            const fecha_solicitud = moment().format("YYYY-MM-DD"+" 00:00:00.000 +00:00");
            const observacion = '';
            const estado = 'PENDIENTE';
            const fecha_inicio = req.body.fecha_inicio;
            const  fecha_fin = req.body.fecha_fin;
            const id_empleado = res.locals.user.id;
            const id_tipo_boleta= req.body.tipo_boleta;
        
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
            
              //res.json('boleta/boleta');
        });
      

  module.exports = router;


