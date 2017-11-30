var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/* GET login page. */
/*router.get('/',function(req, res, next) {
    modelos.Boleta.findAll({
        attributes: ['id', 'fecha_solicitud', 'observacion', 'estado', 'fecha_inicio', 'fecha_fin', 'id_empleado', 'id_tipo_boleta']
    }).then(boletas => {
        //console.log(JSON.stringify(boletas));
        res.render('administrar/boleta', { boletas: boletas });
    });
    });






/* GET login page. */


router.get('/',function(req, res, next) {
      modelos.sequelize.query('SELECT b.id, te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, b.fecha_solicitud, b.estado, b.fecha_inicio, b.fecha_fin, b.id_empleado FROM public."Tipo_boleta" te, public."Empleados" e, public."Boleta" b where e.id=2 and te.id=b.id_tipo_boleta and b.id_empleado=e.id ').spread((boletas, metadata) => {
        console.log('\x1b[33m%s\x1b[0m',JSON.stringify(boletas));
        res.render('boleta/listadoboleta', { boletas: boletas,  moment:moment });
      })
});
    
/*
router.get('/',function(req, res, next) {
  modelos.sequelize.query('SELECT * from  public."Boleta"  ').spread((boletas, metadata) => {
    console.log('\x1b[33m%s\x1b[0m',JSON.stringify(boletas));
    res.render('formularios/consultamarcado', { boletas: boletas });
  })
});

*/

router.post('/buscar', (req, res) => {
  const Op = Sequelize.Op;


      if(req.body.fecha_inicio<req.body.fecha_fin){
        if(req.body.estado!='todos'){
             modelos.Boleta.findAll({
                  where: {
                  estado: req.body.estado,
                  fecha_solicitud: {
                    [Op.between]: [req.body.fecha_inicio+" 00:00:00.000 +00:00",req.body.fecha_fin+" 00:00:00.000 +00:00"]
                  },
                  //include: ['empleado']
                }
              }).then((boletas) => {

                      res.render('boleta/listadoboleta',{boletas:boletas});   
   
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
        res.render('boleta/listadoboleta', { boletas: boletas });
        })
        }
      }
      else{
        req.flash('error_msg','La fecha inicio no puede ser mayor a la fecha fin');
        res.redirect('/boleta/listadoboleta')
      }
});
module.exports = router;