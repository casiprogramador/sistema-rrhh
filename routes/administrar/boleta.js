var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');


/* GET login page. */
router.get('/',function(req, res, next) {
    modelos.Boleta.findAll({
        attributes: ['id', 'fecha_solicitud', 'observacion', 'estado', 'fecha_inicio', 'fecha_fin', 'id_empleado', 'id_tipo_boleta']
    }).then(boletas => {
        //console.log(JSON.stringify(boletas));
        res.render('administrar/boleta', { boletas: boletas });
    });
    });






/* GET login page. */


router.get('/',function(req, res, next) {
      modelos.sequelize.query('SELECT * FROM "Boleta" ').spread((boletas, metadata) => {
        //console.log(boletas);
        res.render('administrar/boleta', { boletas: boletas });
      })
});
    

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
});
module.exports = router;