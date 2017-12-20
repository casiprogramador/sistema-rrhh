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
              Code:x[j][1],
              IP:ip,
              bandera:0,
              }).then()
          }else{
            modelos.BS.create({
              UserID:x[j][1],
              eventTime:x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][1],
              IP:ip,
              bandera:0,
              }).then(newbs=>{
                modelos.Dispositivo.findAll({
                }).then(newdispositivos => {
                  res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                })
            })}
      }
    })
  }).end();
  })


  router.get('/guardar_asistencia', function(req,res, next) {
    var entrada_1;
    var salida_1;
    var entrada_2;
    var salida_2;
    var id_empleado;
    var id_horario;
    var fecha="2017-12-19";
    var fec;
    var x1=moment().format(fecha+" 00:00:00");
    console.log("Hora ------------------>"+x1);
    var x2=moment().format(fecha+" 12:29:00");
    console.log("Hora ------------------>"+x2);
    var x3=moment().format(fecha+" 12:30:00");
    console.log("Hora ------------------>"+x3);
    var x4=moment().format(fecha+" 13:29:00");
    console.log("Hora ------------------>"+x4);
    var x5=moment().format(fecha+" 13:30:00");
    console.log("Hora ------------------>"+x5);
    var x6=moment().format(fecha+" 18:29:00");
    console.log("Hora ------------------>"+x6);
    var x7=moment().format(fecha+" 18:30:00");
    console.log("Hora ------------------>"+x7);
    var x8=moment().format(fecha+" 23:59:00");
    console.log("Hora ------------------>"+x8);
    modelos.Empleado.findAll({}).then(newempleado=>{
      for(i=0;i<newempleado.length;i++){
        modelos.BS.findAll({
          where:{UserID:newempleado[i].ndi}
        }).then(newbs=>{
          if(newbs.length>0){
            var ci=newbs[0].UserID;
            //var ci=newempleado[i].id;
          for(var j=0;j<newbs.length;j++){
            //console.log("ndi hallados en bs"+newbs[j].UserID);
            fec=moment(newbs[j].eventTime).format("YYYY-MM-DD HH:mm:ss");
            //console.log("Hora-->"+fec);
            if(moment(fec).isBetween(x1,x2,null,'[]')){
              //entrada_1=moment(newbs[j].eventTime).format("HH:mm")
              entrada_1=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x3,x4,null,'[]')){
              //moment(salida_1=newbs[j].eventTime).format("HH:mm")
              salida_1=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x5,x6,null,'[]')){
              //moment(entrada_2=newbs[j].eventTime).format("HH:mm")
              entrada_2=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x7,x8,null,'[]')){
              //moment(salida_2=newbs[j].eventTime).format("HH:mm")
              salida_2=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
          }//end for j
          modelos.Asistencia.create({
              fecha:fecha,
              entrada_1:entrada_1,
              salida_1,salida_1,
              entrada_2:entrada_2,
              salida_2:salida_2,
              id_empleado:ci,
          }).then();
        }
        else{console.log("sin marcaciones");}
        })//fin newbs
      }//end for i
      res.render("/home");
    });
  })//inicio

  router.get('/actualizar_asistencia', function(req,res, next) {
    var ci;
    var fecha;
    modelos.Asistencia.findAll({
      where:{id_horario:null}
    }).then(newasistencia=>{
      var count=newasistencia.length;
      for(var i=0;i<count;i++){
        console.log("bucle"+i);
        var id=newasistencia[i].id;
        ci=newasistencia[i].id_empleado;
        fecha=newasistencia[i].fecha;
        modelos.Horario_especial.findAll({
          where:{fecha:fecha,id_empleado:ci}
        }).then(newhorarioesp=>{
          if(newhorarioesp.length!=0){
            for(var j=0;j<newhorarioesp.length;j++){
            const asist_modificado = {
              id_horario:newhorarioesp[j].id_horario,
            }
            modelos.Asistencia.update(asist_modificado, {where: { id: newasistencia[i].id }}).then({});
            }
          }
          else{
            modelos.Empleado.findAll({
              where:{id:ci}
            }).then(newemp=>{
              for(var j=0;j<newemp.length;j++){
                const asist_modificado = {
                  id_horario:newemp[j].id_horario,
                }
                modelos.Asistencia.update(asist_modificado, {where: { id:id }}).then({});
                }   
            });
          }
        });
      }
      res.render("/home");
    });
  })



  router.get('/actualizar_asistencia2', function(req,res, next) {
    modelos.Asistencia.findAll({where:{id_horario:null}}).then(asistencias=>{
      for(i=0;i<asistencias.length;i++){
        modelos.Horario_especial.findAll({where:{id_empleado:asistencias[i].id_empleado}}).then(horarios=>{
          console.log("-->"+i);
        })
      }
    });
  })

module.exports = router;