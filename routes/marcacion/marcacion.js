var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var request = require('request');
var http= require("http");
var md_auth = require('../../middleware/authenticated');
var param = require('../../config/param.json');
var Promise = require("bluebird");
var ZKLib = require("zklib");
var async = require('async');

var marcaciones = function(req,res, next) {
  var ip=req.body.dispositivo;
  var puerto= "4370";
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      //host: "localhost",
      //port: 8080,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(resp) {

      resp.setEncoding('utf8');
      let data = '';
      resp.on('data', function (chunk) {
        data += chunk;
      });
      resp.on('end',()=>{
        req.marcaciones = JSON.parse(data);
        next();
      })
    }).end();
};

var guardar_marcacion = function(req,res2, next) {
  var ip=req.body.ip;
  var puerto= "4370";
  var array1=new Array();
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      //host: "localhost",
      //port: 8080,
      path: '/usr2?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      let data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end',()=>{
        var x = JSON.parse(data);
        console.log('\x1b[33m%s\x1b[0m: ','BS MARCACION:'+x);
        console.log("longitud"+x.length);
        for(var j=0;j<x.length;j++){
          if(j!=x.length-1){
            modelos.BS.create({
              UserID:x[j][1],
              eventTime: x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][1],
              IP:ip,
              bandera:'0',
              }).then()
          }else{
            modelos.BS.create({
              UserID:x[j][1],
              eventTime: x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][1],
              IP:ip,
              bandera:0,
              }).then(newbs=>{
                modelos.Dispositivo.findAll({
                }).then(newdispositivos => {
                  next();
                  //res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                })
            })
          }
      }
      })
  }).end();
};

router.post('/marcaciones', marcaciones, function(req,res, next) {
  var x = req.marcaciones;
  modelos.Dispositivo.findAll({
  }).then(newdispositivos => {
    res.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:req.body.dispositivo,moment:moment});
  })
})

router.post('/guardar_marcacion',guardar_marcacion, function(req, res, next){
  //var fecha_marcado = moment('2018-01-19').format("YYYY-MM-DD");
  if(req.query.fecha){
    var fecha_marcado = req.query.fecha;
  }else{
    var fecha_marcado = moment().format("YYYY-MM-DD");
  }
  
  console.log('\x1b[33m%s\x1b[0m: ','FECHA REQUERIDA:'+fecha_marcado);
  var asistencias_actualizado = [];
  modelos.sequelize.query(`SELECT bs.*,bs.id AS id_marcado, em.nombres, em.id AS id_empleado, ho.id as id_horario, ho.* FROM public."Bs" AS bs INNER JOIN public."Empleados" AS em ON em.id = bs."UserID" INNER JOIN public."Horarios" AS ho ON em.id_horario = ho.id WHERE bandera = '0' AND em.estado = TRUE AND bs."eventTime" BETWEEN '${fecha_marcado }'::timestamp AND '${fecha_marcado }'::timestamp + '1 days'::interval`).spread((marcados, metadata) => {
    console.log('\x1b[33m%s\x1b[0m: ','MARCADOS:'+JSON.stringify(marcados));
    return marcados;
  }).then(marcados=>{

    var promises_marcados = marcados.map((marcado)=>{
      console.log('\x1b[31m%s\x1b[0m: ','MARCADO:'+JSON.stringify(marcado));

      var asistencia_promise = marcado =>{
        return modelos.Horario_especial.findOne({
          where: {
              id_empleado: marcado.UserID,
              fecha: fecha_marcado+' 19:59:00-04'
          },
          include: ['horario']
        }).then((horario_especial) => {
          //console.log('\x1b[36m%s\x1b[0m: ','MARCADO F:'+moment(marcado.eventTime).format("YYYY-MM-DD HH:mm"));
          if(horario_especial){
            //asistencia = 'horario';
            //console.log('\x1b[33m%s\x1b[0m: ','MARCADO:'+JSON.stringify(marcado.id));

            console.log('\x1b[33m%s\x1b[0m: ','HORARIO ESPECIAL'+JSON.stringify(horario_especial.horario));
            let eventTime = moment(marcado.eventTime).format("YYYY-MM-DD HH:mm");

            marcacion_datos = {
             id_marcado: marcado.id_marcado,
             id_empleado : marcado.id_empleado,
             id_horario: horario_especial.horario.id,
             desc_horario: horario_especial.horario.descripcion,
             eventTime: eventTime,
             entrada_1: moment(fecha_marcado+' '+horario_especial.horario.entrada_1).format("YYYY-MM-DD HH:mm"),
             entrada_2: moment(fecha_marcado+' '+horario_especial.horario.entrada_2).format("YYYY-MM-DD HH:mm"),
             salida_1: moment(fecha_marcado+' '+horario_especial.horario.salida_1).format("YYYY-MM-DD HH:mm"),
             salida_2: moment(fecha_marcado+' '+horario_especial.horario.salida_2).format("YYYY-MM-DD HH:mm"),
             min_entrada1: moment(fecha_marcado+' '+horario_especial.horario.min_entrada_1).format("YYYY-MM-DD HH:mm"),
             max_entrada1: moment(fecha_marcado+' '+horario_especial.horario.max_entrada_1).format("YYYY-MM-DD HH:mm"),
             min_salida1: moment(fecha_marcado+' '+horario_especial.horario.min_salida_1).format("YYYY-MM-DD HH:mm"),
             max_salida1: moment(fecha_marcado+' '+horario_especial.horario.max_salida_1).format("YYYY-MM-DD HH:mm"),
             min_entrada2: moment(fecha_marcado+' '+horario_especial.horario.min_entrada_2).format("YYYY-MM-DD HH:mm"),
             max_entrada2: moment(fecha_marcado+' '+horario_especial.horario.max_entrada_2).format("YYYY-MM-DD HH:mm"),
             min_salida2: moment(fecha_marcado+' '+horario_especial.horario.min_salida_2).format("YYYY-MM-DD HH:mm"),
             max_salida2: moment(fecha_marcado+' '+horario_especial.horario.max_salida_2).format("YYYY-MM-DD HH:mm"),
             tolerancia_entrada_1: horario_especial.horario.tolerancia_entrada_1,
             tolerancia_salida_1: horario_especial.horario.tolerancia_salida_1,
             tolerancia_entrada_2: horario_especial.horario.tolerancia_entrada_2,
             tolerancia_salida_2: horario_especial.horario.tolerancia_salida_2
            };

            //console.log('\x1b[36m%s\x1b[0m','MARCACION DATOS:'+JSON.stringify(marcacion_datos));
            if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada1,marcacion_datos.max_entrada1)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Mañana');
              var add_evenTime_tol = moment(marcacion_datos.entrada_1).add(marcacion_datos.tolerancia_entrada_1,'m').format("YYYY-MM-DD HH:mm");
              
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                
                //console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida1,marcacion_datos.max_salida1)){
              console.log('\x1b[36m%s\x1b[0m','Salida Mañana');
              var sub_evenTime_tol = moment(marcacion_datos.salida_1).subtract(marcacion_datos.tolerancia_salida_1,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: 0,
                  observacion_salida_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada2,marcacion_datos.max_entrada2)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Tarde');
              var add_evenTime_tol = moment(marcacion_datos.entrada_2).add(marcacion_datos.tolerancia_entrada_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida2,marcacion_datos.max_salida2)){
              console.log('\x1b[36m%s\x1b[0m','Salida Tarde');
              var sub_evenTime_tol = moment(marcacion_datos.salida_2).subtract(marcacion_datos.tolerancia_salida_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: 0,
                  observacion_salida_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }


            }else{
              var asistencia = {
                error: error
              };
            }

            
          }else{
            //asistencia = 'marcado';
            //console.log('\x1b[36m%s\x1b[0m',JSON.stringify(marcado));
            let eventTime = moment(marcado.eventTime).format("YYYY-MM-DD HH:mm");
            marcacion_datos = {
              id_marcado: marcado.id_marcado,
             id_empleado : marcado.id_empleado,
             desc_horario: marcado.descripcion,
             eventTime: eventTime,
             entrada_1: moment(fecha_marcado+' '+marcado.entrada_1).format("YYYY-MM-DD HH:mm"),
             entrada_2: moment(fecha_marcado+' '+marcado.entrada_2).format("YYYY-MM-DD HH:mm"),
             salida_1: moment(fecha_marcado+' '+marcado.salida_1).format("YYYY-MM-DD HH:mm"),
             salida_2: moment(fecha_marcado+' '+marcado.salida_2).format("YYYY-MM-DD HH:mm"),
             min_entrada1: moment(fecha_marcado+' '+marcado.min_entrada_1).format("YYYY-MM-DD HH:mm"),
             max_entrada1: moment(fecha_marcado+' '+marcado.max_entrada_1).format("YYYY-MM-DD HH:mm"),
             min_salida1: moment(fecha_marcado+' '+marcado.min_salida_1).format("YYYY-MM-DD HH:mm"),
             max_salida1: moment(fecha_marcado+' '+marcado.max_salida_1).format("YYYY-MM-DD HH:mm"),
             min_entrada2: moment(fecha_marcado+' '+marcado.min_entrada_2).format("YYYY-MM-DD HH:mm"),
             max_entrada2: moment(fecha_marcado+' '+marcado.max_entrada_2).format("YYYY-MM-DD HH:mm"),
             min_salida2: moment(fecha_marcado+' '+marcado.min_salida_2).format("YYYY-MM-DD HH:mm"),
             max_salida2: moment(fecha_marcado+' '+marcado.max_salida_2).format("YYYY-MM-DD HH:mm"),
             tolerancia_entrada_1: marcado.tolerancia_entrada_1,
             tolerancia_salida_1: marcado.tolerancia_salida_1,
             tolerancia_entrada_2: marcado.tolerancia_entrada_2,
             tolerancia_salida_2: marcado.tolerancia_salida_2
            };
            console.log('\x1b[36m%s\x1b[0m','MARCACION DATOS:'+JSON.stringify(marcacion_datos));
            
            if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada1,marcacion_datos.max_entrada1)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Mañana');
              var add_evenTime_tol = moment(marcacion_datos.entrada_1).add(marcacion_datos.tolerancia_entrada_1,'m').format("YYYY-MM-DD HH:mm");
              
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida1,marcacion_datos.max_salida1)){
              console.log('\x1b[36m%s\x1b[0m','Salida Mañana');
              var sub_evenTime_tol = moment(marcacion_datos.salida_1).subtract(marcacion_datos.tolerancia_salida_1,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: 0,
                  observacion_salida_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada2,marcacion_datos.max_entrada2)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Tarde');
              var add_evenTime_tol = moment(marcacion_datos.entrada_2).add(marcacion_datos.tolerancia_entrada_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida2,marcacion_datos.max_salida2)){
              console.log('\x1b[36m%s\x1b[0m','Salida Tarde');
              var sub_evenTime_tol = moment(marcacion_datos.salida_2).subtract(marcacion_datos.tolerancia_salida_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: 0,
                  observacion_salida_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }


            }else{
              var asistencia = {
                error: 'error'
              };
            }


          }
          
          return asistencia;
        });
      };

      return asistencia_promise(marcado);
      //console.log(fecha_marcado+' 20:00:00-04');
    })

    Promise.all(promises_marcados).then((asistencias)=>{
      

      var promise_asistencia = asistencias.map((asistencia)=>{
        
        console.log('\x1b[36m%s\x1b[0m','ASISTENCIA:'+JSON.stringify(asistencia));
        console.log('\x1b[36m%s\x1b[0m',(asistencia.horario_entrada_2 == '00:00') ? 0 : asistencia.retraso_entrada_1);
                var default_asistencia = {
                  fecha: asistencia.fecha_marcado,
                  entrada_1:(asistencia.entrada_1) ? asistencia.entrada_1 : null,
                  salida_1: (asistencia.salida_1) ? asistencia.salida_1 : null,
                  entrada_2: (asistencia.entrada_2) ? asistencia.entrada_2 : null,
                  salida_2: (asistencia.salida_2) ? asistencia.salida_2 : null,
                  retraso_entrada_1: (asistencia.horario_entrada_1 == '00:00') ? 0 : asistencia.retraso_entrada_1,
                  retraso_salida_1: (asistencia.horario_salida_1 == '00:00') ? 0 : asistencia.retraso_salida_1,
                  retraso_entrada_2: (asistencia.horario_entrada_2 == '00:00') ? 0 : asistencia.retraso_entrada_2,
                  retraso_salida_2: (asistencia.horario_salida_2 == '00:00') ?  0 : asistencia.retraso_salida_2,
                  observacion_entrada_1 : asistencia.observacion_entrada_1,
                  observacion_salida_1: asistencia.observacion_salida_1,
                  observacion_entrada_2: asistencia.observacion_entrada_2,
                  observacion_salida_2: asistencia.observacion_salida_2,
                  id_empleado: asistencia.id_empleado,
                  id_horario: (asistencia.id_horario) ? asistencia.id_horario : null,
                }
                console.log('\x1b[36m%s\x1b[0m','DATOS CREAR ASISTENCIA:'+JSON.stringify(default_asistencia));
                modelos.Asistencia.findOrCreate(
                  {where: {
                    id_empleado: asistencia.id_empleado,
                    fecha: asistencia.fecha+' 20:00:00-04'
                  }, defaults: default_asistencia })
                .spread((asistencia_encontrada, created) => {
                  let asistencia_actualizable;

                  if(asistencia_encontrada){
                    if(asistencia.tipo === 'E1' ){
                      var updateAsistencia = { 
                        entrada_1: asistencia.entrada_1,
                        retraso_entrada_1: asistencia.retraso_entrada_1,
                        observacion_entrada_1: asistencia.observacion_entrada_1
                      };
                    }else if(asistencia.tipo === 'E2'){
                      var updateAsistencia = { 
                        entrada_2: asistencia.entrada_2,
                        retraso_entrada_2: asistencia.retraso_entrada_2,
                        observacion_entrada_2: asistencia.observacion_entrada_2
                      };
                    }else if(asistencia.tipo === 'S1'){
                      var updateAsistencia = { 
                        salida_1: asistencia.salida_1,
                        retraso_salida_1: asistencia.retraso_salida_1,
                        observacion_salida_1: asistencia.observacion_salida_1
                      };
                    }else if(asistencia.tipo === 'S2'){
                      var updateAsistencia = { 
                        salida_2: asistencia.salida_2,
                        retraso_salida_2: asistencia.retraso_salida_2,
                        observacion_salida_2: asistencia.observacion_salida_2
                      };
                    }else{
                      console.log('error');
                    }
                    console.log('\x1b[36m%s\x1b[0m','update Asistencia:',JSON.stringify(asistencia));
                    console.log('\x1b[36m%s\x1b[0m','update Value1:',updateAsistencia);
                    
                    return modelos.Asistencia.update(
                      updateAsistencia, 
                      { where: {
                         id: asistencia_encontrada.id 
                      } 
                    }).then((result) => {
                      console.log('\x1b[33m%s\x1b[0m','update Value:',updateAsistencia);
                      modelos.Asistencia.findById(asistencia_encontrada.id)
                        .then(function(asistenciaActualizada){
                          //console.log(asistenciaActualizada.dataValues);
                          asistencia_actualizable = asistenciaActualizada.dataValues;
                        }).catch(function (err) {
                          console.log(err);
                        });
                    }); 


                    //console.log('\x1b[36m%s\x1b[0m','ASISTENCIA ENCONTRADA:'+JSON.stringify(asistencia));
                    
                  }else{
                    //console.log('\x1b[36m%s\x1b[0m','ASISTENCIA CREADA'+JSON.stringify(created));
                    asistencia_actualizable = created;
                    
                  }

                }).catch(function(e) {
                  console.log(e);
                 });
                 // Actualizacion de bandera de BS
                 if(asistencia.id_marcado != null){
                  modelos.BS.update(
                    { bandera: 1}, 
                    { where: {
                       id: asistencia.id_marcado
                    } 
                  })
                 }

                 return asistencia;
      })

      Promise.all(promise_asistencia).then( (asistencias)=>{

        console.log('\x1b[33m%s\x1b[0m: ','ASISTENCIA PUSH:'+JSON.stringify(asistencias));
        
        var asistencias_actualizado = [];
        for(var i = 0; i < asistencias.length; i++){
          //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(asistencias[i]));

          asistencias_actualizado.push(asistencias[i]);

        }
        return res.json(asistencias_actualizado);
      });
    });

  })
})

router.get('/actualizar_asistencia', function(req, res, next){
  //var fecha_marcado = moment('2018-01-19').format("YYYY-MM-DD");
  if(req.query.fecha){
    var fecha_marcado = req.query.fecha;
  }else{
    var fecha_marcado = moment().format("YYYY-MM-DD");
  }
  
  console.log('\x1b[33m%s\x1b[0m: ','FECHA REQUERIDA:'+fecha_marcado);
  var asistencias_actualizado = [];
  modelos.sequelize.query(`SELECT bs.*,bs.id AS id_marcado, em.nombres, em.id AS id_empleado, ho.id as id_horario, ho.* FROM public."Bs" AS bs INNER JOIN public."Empleados" AS em ON em.id = bs."UserID" INNER JOIN public."Horarios" AS ho ON em.id_horario = ho.id WHERE bandera = '0' AND em.estado = TRUE AND bs."eventTime" BETWEEN '${fecha_marcado }'::timestamp AND '${fecha_marcado }'::timestamp + '1 days'::interval`).spread((marcados, metadata) => {
    console.log('\x1b[33m%s\x1b[0m: ','MARCADOS:'+JSON.stringify(marcados));
    return marcados;
  }).then(marcados=>{

    var promises_marcados = marcados.map((marcado)=>{
      console.log('\x1b[31m%s\x1b[0m: ','MARCADO:'+JSON.stringify(marcado));

      var asistencia_promise = marcado =>{
        return modelos.Horario_especial.findOne({
          where: {
              id_empleado: marcado.UserID,
              fecha: fecha_marcado+' 19:59:00-04'
          },
          include: ['horario']
        }).then((horario_especial) => {
          //console.log('\x1b[36m%s\x1b[0m: ','MARCADO F:'+moment(marcado.eventTime).format("YYYY-MM-DD HH:mm"));
          if(horario_especial){
            //asistencia = 'horario';
            //console.log('\x1b[33m%s\x1b[0m: ','MARCADO:'+JSON.stringify(marcado.id));

            console.log('\x1b[33m%s\x1b[0m: ','HORARIO ESPECIAL'+JSON.stringify(horario_especial.horario));
            let eventTime = moment(marcado.eventTime).format("YYYY-MM-DD HH:mm");

            marcacion_datos = {
             id_marcado: marcado.id_marcado,
             id_empleado : marcado.id_empleado,
             id_horario: horario_especial.horario.id,
             desc_horario: horario_especial.horario.descripcion,
             eventTime: eventTime,
             entrada_1: moment(fecha_marcado+' '+horario_especial.horario.entrada_1).format("YYYY-MM-DD HH:mm"),
             entrada_2: moment(fecha_marcado+' '+horario_especial.horario.entrada_2).format("YYYY-MM-DD HH:mm"),
             salida_1: moment(fecha_marcado+' '+horario_especial.horario.salida_1).format("YYYY-MM-DD HH:mm"),
             salida_2: moment(fecha_marcado+' '+horario_especial.horario.salida_2).format("YYYY-MM-DD HH:mm"),
             min_entrada1: moment(fecha_marcado+' '+horario_especial.horario.min_entrada_1).format("YYYY-MM-DD HH:mm"),
             max_entrada1: moment(fecha_marcado+' '+horario_especial.horario.max_entrada_1).format("YYYY-MM-DD HH:mm"),
             min_salida1: moment(fecha_marcado+' '+horario_especial.horario.min_salida_1).format("YYYY-MM-DD HH:mm"),
             max_salida1: moment(fecha_marcado+' '+horario_especial.horario.max_salida_1).format("YYYY-MM-DD HH:mm"),
             min_entrada2: moment(fecha_marcado+' '+horario_especial.horario.min_entrada_2).format("YYYY-MM-DD HH:mm"),
             max_entrada2: moment(fecha_marcado+' '+horario_especial.horario.max_entrada_2).format("YYYY-MM-DD HH:mm"),
             min_salida2: moment(fecha_marcado+' '+horario_especial.horario.min_salida_2).format("YYYY-MM-DD HH:mm"),
             max_salida2: moment(fecha_marcado+' '+horario_especial.horario.max_salida_2).format("YYYY-MM-DD HH:mm"),
             tolerancia_entrada_1: horario_especial.horario.tolerancia_entrada_1,
             tolerancia_salida_1: horario_especial.horario.tolerancia_salida_1,
             tolerancia_entrada_2: horario_especial.horario.tolerancia_entrada_2,
             tolerancia_salida_2: horario_especial.horario.tolerancia_salida_2
            };

            //console.log('\x1b[36m%s\x1b[0m','MARCACION DATOS:'+JSON.stringify(marcacion_datos));
            if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada1,marcacion_datos.max_entrada1)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Mañana');
              var add_evenTime_tol = moment(marcacion_datos.entrada_1).add(marcacion_datos.tolerancia_entrada_1,'m').format("YYYY-MM-DD HH:mm");
              
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                
                //console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida1,marcacion_datos.max_salida1)){
              console.log('\x1b[36m%s\x1b[0m','Salida Mañana');
              var sub_evenTime_tol = moment(marcacion_datos.salida_1).subtract(marcacion_datos.tolerancia_salida_1,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: 0,
                  observacion_salida_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada2,marcacion_datos.max_entrada2)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Tarde');
              var add_evenTime_tol = moment(marcacion_datos.entrada_2).add(marcacion_datos.tolerancia_entrada_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida2,marcacion_datos.max_salida2)){
              console.log('\x1b[36m%s\x1b[0m','Salida Tarde');
              var sub_evenTime_tol = moment(marcacion_datos.salida_2).subtract(marcacion_datos.tolerancia_salida_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: 0,
                  observacion_salida_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcacion_datos.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }


            }else{
              var asistencia = {
                error: error
              };
            }

            
          }else{
            //asistencia = 'marcado';
            //console.log('\x1b[36m%s\x1b[0m',JSON.stringify(marcado));
            let eventTime = moment(marcado.eventTime).format("YYYY-MM-DD HH:mm");
            marcacion_datos = {
              id_marcado: marcado.id_marcado,
             id_empleado : marcado.id_empleado,
             desc_horario: marcado.descripcion,
             eventTime: eventTime,
             entrada_1: moment(fecha_marcado+' '+marcado.entrada_1).format("YYYY-MM-DD HH:mm"),
             entrada_2: moment(fecha_marcado+' '+marcado.entrada_2).format("YYYY-MM-DD HH:mm"),
             salida_1: moment(fecha_marcado+' '+marcado.salida_1).format("YYYY-MM-DD HH:mm"),
             salida_2: moment(fecha_marcado+' '+marcado.salida_2).format("YYYY-MM-DD HH:mm"),
             min_entrada1: moment(fecha_marcado+' '+marcado.min_entrada_1).format("YYYY-MM-DD HH:mm"),
             max_entrada1: moment(fecha_marcado+' '+marcado.max_entrada_1).format("YYYY-MM-DD HH:mm"),
             min_salida1: moment(fecha_marcado+' '+marcado.min_salida_1).format("YYYY-MM-DD HH:mm"),
             max_salida1: moment(fecha_marcado+' '+marcado.max_salida_1).format("YYYY-MM-DD HH:mm"),
             min_entrada2: moment(fecha_marcado+' '+marcado.min_entrada_2).format("YYYY-MM-DD HH:mm"),
             max_entrada2: moment(fecha_marcado+' '+marcado.max_entrada_2).format("YYYY-MM-DD HH:mm"),
             min_salida2: moment(fecha_marcado+' '+marcado.min_salida_2).format("YYYY-MM-DD HH:mm"),
             max_salida2: moment(fecha_marcado+' '+marcado.max_salida_2).format("YYYY-MM-DD HH:mm"),
             tolerancia_entrada_1: marcado.tolerancia_entrada_1,
             tolerancia_salida_1: marcado.tolerancia_salida_1,
             tolerancia_entrada_2: marcado.tolerancia_entrada_2,
             tolerancia_salida_2: marcado.tolerancia_salida_2
            };
            console.log('\x1b[36m%s\x1b[0m','MARCACION DATOS:'+JSON.stringify(marcacion_datos));
            
            if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada1,marcacion_datos.max_entrada1)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Mañana');
              var add_evenTime_tol = moment(marcacion_datos.entrada_1).add(marcacion_datos.tolerancia_entrada_1,'m').format("YYYY-MM-DD HH:mm");
              
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida1,marcacion_datos.max_salida1)){
              console.log('\x1b[36m%s\x1b[0m','Salida Mañana');
              var sub_evenTime_tol = moment(marcacion_datos.salida_1).subtract(marcacion_datos.tolerancia_salida_1,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_1: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_1: 0,
                  observacion_salida_1:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_entrada2,marcacion_datos.max_entrada2)){
              console.log('\x1b[36m%s\x1b[0m','Entrada Tarde');
              var add_evenTime_tol = moment(marcacion_datos.entrada_2).add(marcacion_datos.tolerancia_entrada_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isAfter(add_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(add_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'Retraso',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'E2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }
            }else if(moment(marcacion_datos.eventTime).isBetween(marcacion_datos.min_salida2,marcacion_datos.max_salida2)){
              console.log('\x1b[36m%s\x1b[0m','Salida Tarde');
              var sub_evenTime_tol = moment(marcacion_datos.salida_2).subtract(marcacion_datos.tolerancia_salida_2,'m').format("YYYY-MM-DD HH:mm");
              if(moment(eventTime).isBefore(sub_evenTime_tol)){
                console.log('\x1b[363m%s\x1b[0m',moment(sub_evenTime_tol).diff(eventTime,'minutes'));
                console.log('\x1b[36m%s\x1b[0m','Abandono');
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'Abandono',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };

              }else{
                var asistencia = {
                  tipo: 'S2',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  salida_2: marcacion_datos.eventTime,
                  horario_entrada_1:moment(marcacion_datos.entrada_1).format("HH:mm"),
                  horario_entrada_2:moment(marcacion_datos.entrada_2).format("HH:mm"),
                  horario_salida_1:moment(marcacion_datos.salida_1).format("HH:mm"),
                  horario_salida_2:moment(marcacion_datos.salida_2).format("HH:mm"),
                  retraso_salida_2: 0,
                  observacion_salida_2:'En hora',
                  id_empleado: marcacion_datos.id_empleado,
                  id_horario: marcado.id_horario,
                  id_marcado: marcacion_datos.id_marcado
                };
              }


            }else{
              var asistencia = {
                error: 'error'
              };
            }


          }
          
          return asistencia;
        });
      };

      return asistencia_promise(marcado);
      //console.log(fecha_marcado+' 20:00:00-04');
    })

    Promise.all(promises_marcados).then((asistencias)=>{
      

      var promise_asistencia = asistencias.map((asistencia)=>{
        
        console.log('\x1b[36m%s\x1b[0m','ASISTENCIA:'+JSON.stringify(asistencia));
        console.log('\x1b[36m%s\x1b[0m',(asistencia.horario_entrada_2 == '00:00') ? 0 : asistencia.retraso_entrada_1);
                var default_asistencia = {
                  fecha: asistencia.fecha_marcado,
                  entrada_1:(asistencia.entrada_1) ? asistencia.entrada_1 : null,
                  salida_1: (asistencia.salida_1) ? asistencia.salida_1 : null,
                  entrada_2: (asistencia.entrada_2) ? asistencia.entrada_2 : null,
                  salida_2: (asistencia.salida_2) ? asistencia.salida_2 : null,
                  retraso_entrada_1: (asistencia.horario_entrada_1 == '00:00') ? 0 : asistencia.retraso_entrada_1,
                  retraso_salida_1: (asistencia.horario_salida_1 == '00:00') ? 0 : asistencia.retraso_salida_1,
                  retraso_entrada_2: (asistencia.horario_entrada_2 == '00:00') ? 0 : asistencia.retraso_entrada_2,
                  retraso_salida_2: (asistencia.horario_salida_2 == '00:00') ?  0 : asistencia.retraso_salida_2,
                  observacion_entrada_1 : asistencia.observacion_entrada_1,
                  observacion_salida_1: asistencia.observacion_salida_1,
                  observacion_entrada_2: asistencia.observacion_entrada_2,
                  observacion_salida_2: asistencia.observacion_salida_2,
                  id_empleado: asistencia.id_empleado,
                  id_horario: (asistencia.id_horario) ? asistencia.id_horario : null,
                }
                console.log('\x1b[36m%s\x1b[0m','DATOS CREAR ASISTENCIA:'+JSON.stringify(default_asistencia));
                modelos.Asistencia.findOrCreate(
                  {where: {
                    id_empleado: asistencia.id_empleado,
                    fecha: asistencia.fecha+' 20:00:00-04'
                  }, defaults: default_asistencia })
                .spread((asistencia_encontrada, created) => {
                  let asistencia_actualizable;

                  if(asistencia_encontrada){
                    if(asistencia.tipo === 'E1' ){
                      var updateAsistencia = { 
                        entrada_1: asistencia.entrada_1,
                        retraso_entrada_1: asistencia.retraso_entrada_1,
                        observacion_entrada_1: asistencia.observacion_entrada_1
                      };
                    }else if(asistencia.tipo === 'E2'){
                      var updateAsistencia = { 
                        entrada_2: asistencia.entrada_2,
                        retraso_entrada_2: asistencia.retraso_entrada_2,
                        observacion_entrada_2: asistencia.observacion_entrada_2
                      };
                    }else if(asistencia.tipo === 'S1'){
                      var updateAsistencia = { 
                        salida_1: asistencia.salida_1,
                        retraso_salida_1: asistencia.retraso_salida_1,
                        observacion_salida_1: asistencia.observacion_salida_1
                      };
                    }else if(asistencia.tipo === 'S2'){
                      var updateAsistencia = { 
                        salida_2: asistencia.salida_2,
                        retraso_salida_2: asistencia.retraso_salida_2,
                        observacion_salida_2: asistencia.observacion_salida_2
                      };
                    }else{
                      console.log('error');
                    }
                    console.log('\x1b[36m%s\x1b[0m','update Asistencia:',JSON.stringify(asistencia));
                    console.log('\x1b[36m%s\x1b[0m','update Value1:',updateAsistencia);
                    
                    return modelos.Asistencia.update(
                      updateAsistencia, 
                      { where: {
                         id: asistencia_encontrada.id 
                      } 
                    }).then((result) => {
                      console.log('\x1b[33m%s\x1b[0m','update Value:',updateAsistencia);
                      modelos.Asistencia.findById(asistencia_encontrada.id)
                        .then(function(asistenciaActualizada){
                          //console.log(asistenciaActualizada.dataValues);
                          asistencia_actualizable = asistenciaActualizada.dataValues;
                        }).catch(function (err) {
                          console.log(err);
                        });
                    }); 


                    //console.log('\x1b[36m%s\x1b[0m','ASISTENCIA ENCONTRADA:'+JSON.stringify(asistencia));
                    
                  }else{
                    //console.log('\x1b[36m%s\x1b[0m','ASISTENCIA CREADA'+JSON.stringify(created));
                    asistencia_actualizable = created;
                    
                  }


                  
                }).catch(function(e) {
                  console.log(e);
                 });
                 // Actualizacion de bandera de BS
                 if(asistencia.id_marcado != null){
                  modelos.BS.update(
                    { bandera: 1}, 
                    { where: {
                       id: asistencia.id_marcado
                    } 
                  })
                 }



          
                 return asistencia;
      })

      Promise.all(promise_asistencia).then( (asistencias)=>{

        console.log('\x1b[33m%s\x1b[0m: ','ASISTENCIA PUSH:'+JSON.stringify(asistencias));
        
        var asistencias_actualizado = [];
        for(var i = 0; i < asistencias.length; i++){
          //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(asistencias[i]));

          asistencias_actualizado.push(asistencias[i]);

        }
        return res.json(asistencias_actualizado);
      });
    });

  })
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













  module.exports = router;
