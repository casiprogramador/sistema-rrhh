var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');



/* GET login page. */


router.get('/',function(req, res, next) {
      modelos.sequelize.query('SELECT * FROM "Boleta" ').spread((boletas, metadata) => {
        //console.log(boletas);
        res.render('administrar/boleta', { boletas: boletas });
      })
});
    

router.post('/buscar', (req, res) => {
  const Op = Sequelize.Op;
        console.log(req.body);
      
        if(req.body.estado!='todos'){
            
            modelos.Boleta.findAll({
                where: {
                  estado: req.body.estado,
                  fecha_solicitud: {
                    [Op.between]: [req.body.fecha_inicio+" 00:00:00.000 +00:00",req.body.fecha_fin+" 00:00:00.000 +00:00"]
                  }
                  
                }
              }).then((boletas) => {
              res.render('administrar/boleta', { boletas: boletas });
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




});








module.exports = router;