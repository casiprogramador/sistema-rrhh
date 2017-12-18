var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var request = require('request');
var http= require("http");
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');


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
      host: "localhost",
      port: 8080,
      path: '/usr2?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var x = JSON.parse(chunk);
        var array2=new Array();
        for(var j=0;j<x.length;j++){
          if(j!=x.length-1){
            modelos.BS.create({
              UserID:x[j][1],
              eventTime:x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][3],
              IP:ip,
              bandera:0,
              }).then()
          }else{
            modelos.BS.create({
              UserID:x[j][1],
              eventTime:x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][3],
              IP:ip,
              bandera:0,
              }).then(newbs=>{
                modelos.Dispositivo.findAll({
                }).then(newdispositivos => {
                  res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                })
              })
          }
        }
        })
    }).end();
  })


  router.get('/guardar_asistencia', function(req,res, next) {
    /*var fechaini=req.body.fechaini;
    var fechafin=req.body.fechafin;*/
    /*var fechaini="2017/12/13 00:00:00";
    var fechafin="2017/12/13 23:59:59";
    var query = 'select * from "Bs" where "eventTime" between "'+fechaini+" and "+fechafin+"'";*/
    var fecha;
    var entrada_1;
    var salida_1;
    var entrada_2;
    var salida_2;
    var id_empleado;
    var id_horario;
    var fecha="2017-12-14";
    modelos.Empleado.findAll({
    }).then(newempleado=>{
      for(var i=0;i<newempleado.length;i++){
        modelos.BS.findAll({
          where:{UserID:newempleado[i].ndi}
        }).then(newbs=>{
          for(var j=0;j<newbs.length;j++){
            var fec =moment(newbs[j].eventTime).format('YYYY-MM-DD');
            var hora=moment(newbs[j].eventTime).format("1900-01-01"+"HH:mm");
            var x1=moment().format("1900-01-01 00:00");
            var x2=moment().format("1900-01-01 12:29");
            var x3=moment().format("1900-01-01 12:30");
            var x4=moment().format("1900-01-01 13:29");
            var x5=moment().format("1900-01-01 13:30");
            var x6=moment().format("1900-01-01 18:29");
            var x7=moment().format("1900-01-01 18:30");
            var x8=moment().format("1900-01-01 23:59");
            /*x1=moment(x1).format("HH:mm");
            x2=moment(x2).format("HH:mm");
            x3=moment(x3).format("HH:mm");
            x4=moment(x4).format("HH:mm");
            x5=moment(x5).format("HH:mm");
            x6=moment(x6).format("HH:mm");
            x7=moment(x7).format("HH:mm");
            x8=moment(x8).format("HH:mm");*/
            console.log(hora+"---"+x1+"------"+x2+"--------"+x3);
            if(fec==fecha){
              if(hora>moment.utc(x1).format("HH:mm") || hora<moment(x2).format("HH:mm"))
              {
                entrada_1=newbs[j].eventTime;
              }
              if(hora>moment(x3).format("HH:mm") || hora<moment(x4).format("HH:mm"))
              {
                salida_1=newbs[j].eventTime;
              }
              if(hora>moment(x5).format("HH:mm") || hora<moment(x6).format("HH:mm"))
              {
                entrada_2=newbs[j].eventTime;
              }
              if(hora>moment(x7).format("HH:mm") || hora<moment(x8).format("HH:mm"))
              {
                salida_2=newbs[j].eventTime;
              }
            }
          }
          /*id_empleado=newempleado[i].ndi;
          modelos.Asistencia.create({
            fecha:fecha,
            entrada_1:entrada_1,
            salida_1,salida_1,
            entrada_2:entrada_2,
            salida_2:salida_2,
            id_empleado:id_empleado
          }).then();*/
          })
          id_empleado=newempleado[i].ndi;
          modelos.Asistencia.create({
            fecha:fecha,
            entrada_1:entrada_1,
            salida_1,salida_1,
            entrada_2:entrada_2,
            salida_2:salida_2,
            id_empleado:id_empleado
          }).then();
      }//fin for i
      res.render("/home");
    })
  })


module.exports = router;