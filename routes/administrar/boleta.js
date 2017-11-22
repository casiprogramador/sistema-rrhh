var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var Sequelize = require('sequelize');


router.get('/',function(req, res, next) {
  modelos.Boleta.findAll({
    include: ['empleado']

 }).then((boletas) => {
   console.log(boletas);
         res.render('administrar/boleta',{boletas:boletas});   
       })
});
    

router.post('/buscar', (req, res) => {
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
});
module.exports = router;