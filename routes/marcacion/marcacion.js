var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var request = require('request');
var http= require("http");
var md_auth = require('../../middleware/authenticated');


// options for GET
/*router.get('/marcaciones', function(req,res2, next) {
  console.log(req.query.dispositivos);
  console.log(req.query.dispositivos.length);
  var ips=req.query.dispositivos;
  console.log("prueba",ips);
  console.log("num",ips.length);
  var ip= "192.168.130.33";
  var puerto= "4370";
    var options = {
      host: "localhost",
      port: 8080,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET',
      params: {
          ips: JSON.stringify(t) // ids is [1, 2, 3, 4]
        }
    };
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var x = JSON.parse(chunk);
        res2.json(x);
      });
    }).end(); 
})*/

router.post('/marcaciones', function(req,res2, next) {
  var ip=req.body.dispositivo;
  var puerto= "4370";
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: "localhost",
      port: 8080,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var x = JSON.parse(chunk);
        res2.json(x);
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
    // projects will be an array of Project instances with the specified name
    res.render('marcacion/marcacion',{newdispositivo:newdispositivos});
  })
})
module.exports = router;