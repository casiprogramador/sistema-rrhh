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

router.get('/actualizar_asistencia', function(req, res, next){
  //var fecha_marcado = moment('2018-01-19').format("YYYY-MM-DD");
  if(req.query.fecha){
    var fecha_marcado = req.query.fecha;
  }else{
    var fecha_marcado = moment().format("YYYY-MM-DD");
  }
  
  console.log('\x1b[33m%s\x1b[0m: ','FECHA REQUERIDA:'+fecha_marcado);
  var asistencias_actualizado = [];
  modelos.sequelize.query(`SELECT bs.*,bs.id AS id_marcado, em.nombres, em.id AS id_empleado, ho.id as id_horario, ho.* FROM public."Bs" AS bs INNER JOIN public."Empleados" AS em ON em.id = bs."UserID" INNER JOIN public."Horarios" AS ho ON em.id_horario = ho.id WHERE bandera = '0' AND em.estado = TRUE AND bs."eventTime" BETWEEN '${fecha_marcado }'::timestamp AND '${fecha_marcado }'::timestamp + '1 days'::interval `).spread((marcados, metadata) => {
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
                
                console.log('\x1b[36m%s\x1b[0m','Llego Tarde');
                var asistencia = {
                  tipo: 'E1',
                  horario: marcacion_datos.desc_horario,
                  fecha: fecha_marcado,
                  entrada_1: marcacion_datos.eventTime,
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'retraso',
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
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'',
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
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'abandono',
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
                  retraso_salida_1: 0,
                  observacion_salida_1:'',
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
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'retraso',
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
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'',
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
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'abandono',
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
                  retraso_salida_2: 0,
                  observacion_salida_2:'',
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
                  retraso_entrada_1: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_1:'retraso',
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
                  retraso_entrada_1: 0,
                  observacion_entrada_1:'',
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
                  retraso_salida_1: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_1:'abandono',
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
                  retraso_salida_1: 0,
                  observacion_salida_1:'',
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
                  retraso_entrada_2: moment(add_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_entrada_2:'retraso',
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
                  retraso_entrada_2: 0,
                  observacion_entrada_2:'',
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
                  retraso_salida_2: moment(sub_evenTime_tol).diff(eventTime,'minutes'),
                  observacion_salida_2:'abandono',
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
                  retraso_salida_2: 0,
                  observacion_salida_2:'',
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
                var default_asistencia = {
                  fecha: asistencia.fecha_marcado,
                  entrada_1:(asistencia.entrada_1) ? asistencia.entrada_1 : null,
                  salida_1: (asistencia.salida_1) ? asistencia.salida_1 : null,
                  entrada_2: (asistencia.entrada_2) ? asistencia.entrada_2 : null,
                  salida_2: (asistencia.salida_2) ? asistencia.salida_2 : null,
                  retraso_entrada_1: asistencia.retraso_entrada_1,
                  retraso_salida_1: asistencia.retraso_salida_1,
                  retraso_entrada_2: asistencia.retraso_entrada_2,
                  retraso_salida_2: asistencia.retraso_salida_2,
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

                 modelos.BS.update(
                  { bandera: 1}, 
                  { where: {
                     id: asistencia.id_marcado
                  } 
                })


          
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



router.post('/marcaciones', function(req,res2, next) {
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
        modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
          res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
        })
      })
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
                  res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                })
            })}
      }
      })
  }).end();
  })



  var marcaciones=function(req,res, next) {
    modelos.Empleado.findAll({}).then(newempleado=>{
      modelos.BS.findAll({where:{bandera:'0'}}).then(newbs=>{
        req.newempleado=newempleado;
        req.newbs=newbs;
        next()
      })
    });
  }
router.use(marcaciones);
  router.get('/guardar_asistencia', function(req,res, next) {
    console.log(req.query.fecha);

    var entrada_1;
    var salida_1;
    var entrada_2;
    var salida_2;
    var id_empleado;
    var id_horario;
    var fecha=req.query.fecha;
    var fec;
    var sw=0;
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
    
      for(i=0;i<req.newempleado.length;i++){
        sw=0;
          for(var j=0;j<req.newbs.length;j++){
            fec=moment(req.newbs[j].eventTime).format("YYYY-MM-DD HH:mm:ss");
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x1,x2,null,'[]')){
              entrada_1=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x3,x4,null,'[]')){
              salida_1=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x5,x6,null,'[]')){
              entrada_2=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x7,x8,null,'[]')){
              salida_2=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
          }//end for j
          if(sw==1){
            sw=0;
            var date=moment().format(fecha+" 00:00:00");
          modelos.Asistencia.create({
              fecha:date,
              entrada_1:entrada_1,
              salida_1,salida_1,
              entrada_2:entrada_2,
              salida_2:salida_2,
              id_empleado:req.newempleado[i].id,
          }).then();
        }
      }//end for i
      res.json({fecha:{fecha}});    
  })//inicio



  var datos=function(req,res, next) {
    modelos.Asistencia.findAll({where:{id_horario:null}}).then(newasistencias=>{
      modelos.Horario_especial.findAll({}).then(newhorarioesp=>{
        modelos.Horario.findAll({}).then(newhorario=>{
          modelos.Empleado.findAll({}).then(newempleado=>{
            req.newasistencia=newasistencias;
            req.newhorarioesp=newhorarioesp;
            req.newhorario=newhorario;
            req.newempleado=newempleado;
            next();
            //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
          })
        })
      })
    });
  }
router.use(datos);
  router.get('/proceso_datos', function(req,res, next) {
    var idhorario;
    var sw;
    var cont1;
    var cont2;
    for(var i=0;i<req.newasistencia.length;i++){
      idhorario=0;
      sw=0;
      cont1=0;
      cont2=0;
      if(req.newasistencia[i].id_horario==null){
      while(sw==0 && cont1!=req.newhorarioesp.length){
        if(req.newasistencia[i].id_empleado==req.newhorarioesp[cont1].id_empleado && req.newasistencia[i].fecha==req.newhorarioesp[cont1].fecha){
          idhorario=req.newhorarioesp[cont1].id_horario;
          sw=1;
        }else{
          cont1=cont1+1;
        }
      }
      if(sw==0){
        while(sw==0 && cont2!=req.newempleado.length){
          if(req.newasistencia[i].id_empleado==req.newempleado[cont2].id){
            idhorario=req.newempleado[cont2].id_horario;
            sw=1;
          }else{
            cont2=cont2+1;
          }
        } 
      }
      }
      if(sw==1){
        const asist_modificado = {
          id_horario:idhorario,
        }
        modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then(modificados=>{
        });
      }
    }
  })


  var horarios=function(req,res, next) {
    modelos.Asistencia.findAll({where:{retraso_entrada_1:null,retraso_salida_1:null,retraso_entrada_2:null,retraso_salida_2:null}}).then(newasistencias=>{
        modelos.Horario.findAll({}).then(newhorario=>{
            req.newasistencia=newasistencias;
            req.newhorario=newhorario;
            next();
            //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
        })
    });
  }
router.use(horarios);
router.get('/calculo_datos', function(req,res, next) {
  var retraso_entrada_1;
  var retraso_salida_1;
  var retraso_entrada_2;
  var retraso_salida_2;
  var observacion_entrada_1;
  var observacion_salida_1;
  var observacion_entrada_2;
  var observacion_salida_2;
  var sw=0;
  var cont=0;
  for(var i=0;i<req.newasistencia.length;i++){
    while(sw==0 || cont<req.newhorario.lenght){
      if(req.newasistencia[i].id_horario==req.newhorario[cont].id){
        var calcent1=moment().format("YYYY-MM-DD "+req.newhorario[cont].entrada_1);
        var calcent1=moment(calcent1).add(req.newhorario[cont].tolerancia_entrada_1,"minutes").format('HH:mm');
        var calcent2=moment().format("YYYY-MM-DD "+req.newhorario[cont].entrada_2);
        var calcent2=moment(calcent2).add(req.newhorario[cont].tolerancia_entrada_1,"minutes").format('HH:mm');
        var calc1=0;
        var calc2=0;
        var calc3=0;
        var calc4=0;
        observacion_entrada_1=null,
        observacion_entrada_2=null,
        observacion_salida_1=null,
        observacion_salida_2=null,
        console.log("registros-->"+calcent1+"->>"+calcent2);
        if(req.newasistencia[i].entrada_1>calcent1){
          var tiempo_inicio=moment(req.newasistencia[i].entrada_1,'HH:mm');
          var tiempo_fin=moment(calcent1,'HH:mm');
          //calcent1=(moment().format("YYYY-MM-DD "+req.newasistencia[i].entrada_1)) - (moment().format("YYYY-MM-DD "+calcent1));
          calc1=(moment.duration(tiempo_inicio - tiempo_fin))/3600000;
          calc1=calc1*60;
          console.log("atraso primera entrada->"+calcent1+"otra hora--->"+req.newasistencia[i].entrada_1+"->"+calc1);
        }
        if(req.newasistencia[i].entrada_2>calcent2){
          var tiempo_inicio=moment(req.newasistencia[i].entrada_2,'HH:mm');
          var tiempo_fin=moment(calcent2,'HH:mm');
          //calcent1=(moment().format("YYYY-MM-DD "+req.newasistencia[i].entrada_2)) - (moment().format("YYYY-MM-DD "+calcent2));
          calc2=(moment.duration(tiempo_inicio - tiempo_fin))/3600000;
          calc2=calc2*60;
          console.log("atraso segunda entrada->"+calcent2+"otra hora--->"+req.newasistencia[i].entrada_2+"->"+calc2);
        }
        if(req.newasistencia[i].entrada_1==null){
          calc1=null;
          observacion_entrada_1="ABANDONO";
        }
        if(req.newasistencia[i].entrada_2==null){
          calc2=null;
          observacion_entrada_2="ABANDONO";
        }
        if(req.newasistencia[i].salida_1==null){
          calc3=null;
          observacion_salida_1="ABANDONO";
        }
        if(req.newasistencia[i].salida_2==null){
          calc4=null;
          observacion_salida_2="ABANDONO";
        }
        const asist_modificado = {
          retraso_entrada_1:calc1,
          retraso_entrada_2:calc2,
          retraso_salida_1:calc3,
          retraso_salida_2:calc4,
          observacion_entrada_1:observacion_entrada_1,
          observacion_entrada_2:observacion_entrada_2,
          observacion_salida_1:observacion_salida_1,
          observacion_salida_2:observacion_salida_2,
        }
        modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then({})
        sw=1;
        }else{
        cont=cont+1;
        }
    }
    cont=0;
    sw=0;
  }
})



var boletas=function(req,res, next) {
  modelos.Boleta.findAll({}).then(newboletas=>{
      modelos.Tipo_boleta.findAll({}).then(newtipo_boleta=>{
        modelos.Asistencia.findAll({}).then(newasistencia=>{
          req.newasistencia=newasistencia;
          req.newboletas=newboletas;
          req.newtipo_boleta=newtipo_boleta;
          next();
          //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
      })
  })
})
}
router.use(boletas);
router.get('/calculo_boletas', function(req,res, next) {
/*var fechaini=req.query.fechaini;
var fechafin=req.query.fechafin;
var id_empleado=req.query.id_empleado;*/
var fechaini=moment("2017-12-20", "YYYY-MM-DD");
var fechafin=moment("2017-12-20", "YYYY-MM-DD");
fechaini=fechaini.format("YYYY-MM-DD");
fechafin=fechafin.format("YYYY-MM-DD");
/*console.log(fechaini);
console.log(fechafin);*/
var id_empleado="6036979";
for(var i=0;i<req.newasistencia.length;i++){
  var x=moment(req.newasistencia[i].fecha).format("YYYY-MM-DD");
    if (moment(x).isBetween(fechaini, fechafin,'days', '[]') && id_empleado==req.newasistencia[i].id_empleado) {
      for(var j=0;j<req.newboletas.length;j++){
        var fec_ini_boleta=moment(req.newboletas[j].fecha_inicio).format("YYYY-MM-DD");
        var fec_fin_boleta=moment(req.newboletas[j].fecha_fin).format("YYYY-MM-DD");
        var n=moment(req.newboletas[j].fecha_inicio).format("HH:mm:ss")
        if (moment(x).isBetween(fec_ini_boleta, fec_fin_boleta,'days', '[]') && id_empleado==req.newasistencia[i].id_empleado) {
          for(var k=0;k<req.newtipo_boleta.length;k++){
            if(req.newboletas[j].id_tipo_boleta==req.newtipo_boleta[k].id){
              var observacion_entrada_1=req.newtipo_boleta[k].Tipo_boleta;
              var observacion_entrada_2=req.newtipo_boleta[k].Tipo_boleta;
              var observacion_salida_1=req.newtipo_boleta[k].Tipo_boleta;
               var observacion_salida_2=req.newtipo_boleta[k].Tipo_boleta;
               if(req.newboletas[j]){}
              const asist_modificado = {
                observacion_entrada_1:observacion_entrada_1,
                observacion_entrada_2:observacion_entrada_2,
                observacion_salida_1:observacion_salida_1,
                observacion_salida_2:observacion_salida_2,
              }
              modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then({})              
            }
          }
        }
      }
    }else {
        console.log('is not between')
      }
}
//res.render();
})

module.exports = router;
