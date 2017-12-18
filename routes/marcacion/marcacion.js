var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var request = require('request');
var http= require("http");
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');
var param = require('../../config/param.json');


router.post('/marcaciones', md_auth.ensureAuth, function(req,res2, next) {

  var ip=req.body.dispositivo;
  var puerto= "4370";
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));

      res.setEncoding('utf8');

      let data = '';

      res.on('data', function (chunk) {
        //console.log('\x1b[33m%s\x1b[0m',chunk);
        data += chunk;
      });

      res.on('end', function () {
        var x = JSON.parse(data);
        //console.log("--"+x.length+"--"+x[0]+"--"+x[0][0]);
        modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
          res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
        })
      });
    }).end();
})


router.get('/dispositivos',md_auth.ensureAuth, function(req,res, next) {
  modelos.Dispositivo.findAll({
  }).then(newdispositivos => {
    // projects will be an array of Project instances with the specified name
    res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
  })
})


router.post('/registro_dispositivo',md_auth.ensureAuth, (req, res) => {
  const DireccionIP = req.body.ip;
  const Puerto = req.body.puerto;
  const Cod_Estado = req.body.estado;
  const Modelo = req.body.modelo;
  const Identificador = req.body.identificador;
  const Comentario = req.body.comentario;
  modelos.Dispositivo.create({
    DireccionIP: DireccionIP,
    Puerto: Puerto,
    Cod_Estado: Cod_Estado,
    Modelo: Modelo,
    Identificador: Identificador,
    Comentario: Comentario,
  })
    .then(newdispositivocreado => {
      modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
        // projects will be an array of Project instances with the specified name
        res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
      })
      //res.render('/identificacion_personal2',{ci:ci});
      //res.json(newempleado);
    })
});

router.post('/elimina_dispositivo',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id
  modelos.Dispositivo.destroy({  
    where: { id: id }
  })
  .then(deletedispositivo => {
    modelos.Dispositivo.findAll({
    }).then(newdispositivos => {
      // projects will be an array of Project instances with the specified name
      res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
    })
  });
});


router.get('/marcacion',md_auth.ensureAuth, function(req,res, next) {
  modelos.Dispositivo.findAll({
  }).then(newdispositivos => {
    var x = new Array();
    res.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,moment:moment});
  })
})



router.post('/guardar_marcacion', function(req,res2, next) {
  var ip=req.body.ip;
  var puerto= "4370";
  var array1=new Array();
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      path: '/usr2?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      let data = '';
      res.setEncoding('utf8');
      
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
          var x = JSON.parse(data);
          console.log('\x1b[33m%s\x1b[0m',x);
          
          /*
          var array2=new Array();
          for(var j=0;j<x.length;j++){
            if(j!=x.length-1){
              modelos.BS.create({
                UserID:x[j][1],
                eventTime:x[j][3],
                tnaEvent:x[j][2],
                Code:x[j][3],
                IP:ip,
                }).then()
            }else{
              modelos.BS.create({
                UserID:x[j][1],
                eventTime:x[j][3],
                tnaEvent:x[j][2],
                Code:x[j][3],
                IP:ip,
                }).then(newbs=>{
                  modelos.Dispositivo.findAll({
                  }).then(newdispositivos => {
                    res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                  })
                })
            }
          }
          */
      });
    }).end();
  })


module.exports = router;