var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var Sequelize = require('sequelize');
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');
/**
 * Vista principal de administracion de boletas 
 * Administrador
 */
router.get('/', md_auth.ensureAuth, function (req, res, next) {
  modelos.Boleta.findAll({
    where: {
      estado: 'Pendiente',
    },
    include: ['empleado', 'tipoboleta']

  }).then((boletas) => {
    //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(boletas));
    res.render('administrar/boleta', {
      boletas: boletas,
      moment: moment
    });
  })
});


router.post('/buscar', (req, res) => {


  if (req.body.estado == 'Todos') {
    modelos.Boleta.findAll({
      include: ['empleado', 'tipoboleta'],
    }).then((boletas) => {
      res.render('administrar/boleta', {
        boletas: boletas,
        moment: moment
      });
    })
  } else {
    modelos.Boleta.findAll({
      where: {
        estado: req.body.estado,
      },
      include: ['empleado', 'tipoboleta'],
    }).then((boletas) => {

      res.render('administrar/boleta', {
        boletas: boletas,
        moment: moment
      });
    })
  }

});

router.post('/estado', (req, res) => {
  console.log('\x1b[33m%s\x1b[0m: ', JSON.stringify(req.body));
  //res.json(req.body);
  let actualizarBoleta = {
    //estado: req.body.estado_boleta,
    observacion: req.body.observacion,
    usuario_anulacion_aprobacion: res.locals.user.id,
    fecha_anulacion_aprobacion: moment().format()
  };

  modelos.Boleta.update(
    actualizarBoleta, {
      where: {
        id: req.body.id_boleta
      }
    }).then((updateboleta) => {

    /*
     *Creacion o actualizacion de asistencias
     */
    if (req.body.estado_boleta == 'Aprobado') {
      if (req.body.id_tipo_boleta == 14) {

        if (req.body.periodo_marcado == '1e') {
          updateAsistenciaMarcado = {
            retraso_entrada_1: 0,
            observacion_entrada_1: req.body.texto_boleta
          }
        } else if (req.body.periodo_marcado == '1s') {
          updateAsistenciaMarcado = {
            retraso_salida_1: 0,
            observacion_salida_1: req.body.texto_boleta
          }
        } else if (req.body.periodo_marcado == '2e') {
          updateAsistenciaMarcado = {
            retraso_entrada_2: 0,
            observacion_entrada_2: req.body.texto_boleta
          }
        } else {
          updateAsistenciaMarcado = {
            retraso_salida_2: 0,
            observacion_salida_2: req.body.texto_boleta
          }
        }
        console.log('\x1b[33m%s\x1b[0m: ', 'fecha marcado:' + moment(req.body.fecha_marcado).format("YYYY-MM-DD") + ' 20:00:00-04');
        modelos.Asistencia.update(
          updateAsistenciaMarcado, {
            where: {
              id_empleado: req.body.id_empleado,
              fecha: moment(req.body.fecha_marcado).format("YYYY-MM-DD") + ' 20:00:00-04'
            }
          }).then((asistenciaActualizada) => {
          if (asistenciaActualizada) {
            console.log('\x1b[33m%s\x1b[0m: ', asistenciaActualizada);
            req.flash('success_msg', 'Boleta actualizada correctamene');
            res.redirect('/administrar/boleta');
            res.end();
          } else {
            req.flash('success_msg', 'No se puede actualizar la asistencia');
            res.redirect('/administrar/boleta');
            res.end();
          }

        }).catch(function (err) {
          console.log(err);
        });
      } else {
        var fecha_inicial = moment(req.body.fecha_inicio).format("YYYY-MM-DD HH:mm");
        var fecha_final = moment(req.body.fecha_fin).format("YYYY-MM-DD HH:mm");
        var fecha_iterada = moment(req.body.fecha_inicio).format("YYYY-MM-DD HH:mm");

        var fechas_array = [];

        while (moment(fecha_iterada).isBefore(fecha_final)) {
          fechas_array.push(moment(fecha_iterada).format("YYYY-MM-DD"));
          fecha_iterada = moment(fecha_iterada).add(24, 'hours').format("YYYY-MM-DD HH:mm");
        }

        console.log('\x1b[33m%s\x1b[0m: ', fechas_array);
        var promises_asistencia = fechas_array.map((fecha_asistencia) => {
          array_asistencia = [];
          return modelos.Asistencia.findOne({
            where: {
              id_empleado: req.body.id_empleado,
              fecha: moment(fecha_asistencia).format("YYYY-MM-DD") + ' 20:00:00-04'
            }
          }).then(asistencia => {
            console.log('\x1b[33m%s\x1b[0m: ', 'ASISTENCIA: ' + JSON.stringify(asistencia));
            if (asistencia == null) {
              var default_asistencia = {
                fecha: moment(fecha_asistencia).format("YYYY-MM-DD") + ' 20:00:00-04',
                entrada_1: null,
                salida_1: null,
                entrada_2: null,
                salida_2: null,
                retraso_entrada_1: 0,
                retraso_salida_1: 0,
                retraso_entrada_2: 0,
                retraso_salida_2: 0,
                observacion_entrada_1: null,
                observacion_salida_1: null,
                observacion_entrada_2: null,
                observacion_salida_2: null,
                id_empleado: req.body.id_empleado,
                id_horario: req.body.id_horario
              }
              return modelos.Asistencia.create(default_asistencia).then(asistencia_creada => {
                console.log('\x1b[33m%s\x1b[0m: ', 'ASISTENCIA CREADA: ' + JSON.stringify(asistencia_creada));
                return asistencia_creada;
              }).catch(function (err) {
                console.log(err);
              });
            } else {
              return asistencia;
            }
          })


        })

        Promise.all(promises_asistencia).then((asistencias) => {
          console.log('\x1b[33m%s\x1b[0m: ', 'ENTRA A PROMESA');
          //console.log('\x1b[33m%s\x1b[0m: ','fecha inicio'+ moment(req.body.fecha_inicio).format("YYYY-MM-DD HH:mm"));
          //console.log('\x1b[33m%s\x1b[0m: ','fecha fin'+ moment(req.body.fecha_fin).format("YYYY-MM-DD HH:mm"));
          //console.log('\x1b[33m%s\x1b[0m: ',req.body.texto_boleta);
          array_asistencia_boleta = [];
          var fecha_inicial = moment(req.body.fecha_inicio).format("YYYY-MM-DD HH:mm");
          var fecha_final = moment(req.body.fecha_fin).format("YYYY-MM-DD HH:mm");
          var fecha_iterada_boleta = moment(req.body.fecha_inicio).format("YYYY-MM-DD HH:mm");

          while (moment(fecha_iterada_boleta).isBefore(fecha_final)) {

            var fecha_ref = moment(fecha_iterada_boleta).format("YYYY-MM-DD");
            var fecha_media_manana = moment(fecha_ref + ' 13:30:00-04').format("YYYY-MM-DD HH:mm");
            var fecha_dia_ini = moment(fecha_ref + ' 06:00:00-04').format("YYYY-MM-DD HH:mm");
            var fecha_dia_fin = moment(fecha_ref + ' 23:30:00-04').format("YYYY-MM-DD HH:mm");

            if (moment(fecha_iterada_boleta).isBetween(fecha_dia_ini, fecha_dia_fin)) {

              if (moment(fecha_iterada_boleta).isBefore(fecha_media_manana)) {
                console.log('\x1b[33m%s\x1b[0m: ', fecha_ref + ' e1 s1');
                asist_boleta = {
                  fecha: fecha_ref,
                  turno: 1,
                  id_empleado: req.body.id_empleado,
                  boleta: req.body.texto_boleta
                };
                array_asistencia_boleta.push(asist_boleta);
              } else if (moment(fecha_iterada_boleta).isAfter(fecha_media_manana)) {
                console.log('\x1b[33m%s\x1b[0m: ', fecha_ref + ' e2 s2');
                asist_boleta = {
                  fecha: fecha_ref,
                  turno: 2,
                  id_empleado: req.body.id_empleado,
                  boleta: req.body.texto_boleta
                };
                array_asistencia_boleta.push(asist_boleta);
              } else {
                console.log('\x1b[33m%s\x1b[0m: ', 'No asistencia');
              }

            }

            fecha_iterada_boleta = moment(fecha_iterada_boleta).add(8, 'hours').format("YYYY-MM-DD HH:mm");
            console.log('\x1b[33m%s\x1b[0m: ', 'fecha ITERADA add: ' + fecha_iterada_boleta);
          }

          console.log('\x1b[33m%s\x1b[0m: ', 'ARRAY ASISTENCIA BOLETA:' + JSON.stringify(array_asistencia_boleta));
          var promise_asistencia_boleta = array_asistencia_boleta.map((asistencia_boleta) => {
            console.log('\x1b[33m%s\x1b[0m: ', 'ASISTENCIA ACTUALIZAR:' + JSON.stringify(asistencia_boleta));

            var updateAsistencia1 = {
              retraso_entrada_1: 0,
              retraso_salida_1: 0,
              observacion_entrada_1: req.body.texto_boleta,
              observacion_salida_1: req.body.texto_boleta
            };
            var updateAsistencia2 = {
              retraso_entrada_2: 0,
              retraso_salida_2: 0,
              observacion_entrada_2: req.body.texto_boleta,
              observacion_salida_2: req.body.texto_boleta
            };

            if (asistencia_boleta.turno == 1) {

              var updateAsistencia = updateAsistencia1;
            } else if (asistencia_boleta.turno == 2) {

              var updateAsistencia = updateAsistencia2;
            }
            console.log('\x1b[33m%s\x1b[0m: ', 'DATOS ACTUALIZAR' + JSON.stringify(updateAsistencia));
            console.log('\x1b[33m%s\x1b[0m: ', 'ID EMPLEADO' + asistencia_boleta.id_empleado);
            console.log('\x1b[33m%s\x1b[0m: ', 'FECHA' + moment(asistencia_boleta.fecha).format("YYYY-MM-DD") + ' 20:00:00-04');
            return modelos.Asistencia.update(
              updateAsistencia, {
                where: {
                  id_empleado: asistencia_boleta.id_empleado,
                  fecha: moment(asistencia_boleta.fecha).format("YYYY-MM-DD") + ' 20:00:00-04'
                }
              }).then((asistenciaActualizada) => {
              console.log('\x1b[33m%s\x1b[0m: ', asistenciaActualizada);
              return asistenciaActualizada;
            });



          })

          Promise.all(promise_asistencia_boleta).then((asistencias_actualizadas) => {
            console.log('\x1b[33m%s\x1b[0m: ', JSON.stringify(asistencias_actualizadas));
          })

        });
      }



      /*
       *Fin de creacion o actualizacion de asistencia
       */

          /*
     * Actualizacion de Saldo de vacaciones
     */
    if (req.body.id_tipo_boleta == 1 || req.body.id_tipo_boleta == 2) {


      modelos.Saldo_Vacacion.findAll({
        where: {
          id_empleado: req.body.id_empleado,
          prescrito_estado: false
        },
        order: [
          ['gestion', 'ASC'],
        ]
      }).then((saldovacaciones) => {

        console.log('\x1b[33m%s\x1b[0m: ', 'SALDO VACACION:' + JSON.stringify(saldovacaciones));
        var saldo_vacaciones_actualizado = [];
        var dias_vacacion = req.body.dias_vacacion;
        for(var saldo_vacacion of saldovacaciones){
          
          id_saldo_vacacion = saldo_vacacion.id;
          dias_saldo_vacacion = saldo_vacacion.dias;
          dias_actualizado = dias_saldo_vacacion - dias_vacacion;
          if(dias_actualizado <= 0){
            dias_vacacion = Math.abs(dias_actualizado);
            dias_actualizado = 0;
          }else{
            dias_vacacion = 0;
          }
          let saldo_vacacion_actualizado = {
            id: id_saldo_vacacion,
            dias: dias_actualizado
          }
          saldo_vacaciones_actualizado.push(saldo_vacacion_actualizado);
        }

        console.log('\x1b[33m%s\x1b[0m: ', 'SALDO VACACION ACTUALIZADO:' + JSON.stringify(saldo_vacaciones_actualizado));

        var promise_saldo_vacacion = saldo_vacaciones_actualizado.map((saldo_vacacion_actualizado)=>{
          let updateSaldoVacacion = { dias: saldo_vacacion_actualizado.dias};
          console.log('VALORE ACTUALIZAR: '+JSON.stringify(updateSaldoVacacion));
          return  modelos.Saldo_Vacacion.update(
            updateSaldoVacacion, {
            where: {
              id: saldo_vacacion_actualizado.id
            }
          }).then((result) => {

            return result;

          }).catch(function (err) {
            console.log(err);
          });
        })

        Promise.all(promise_saldo_vacacion).then((saldo_vacacion_guardado)=>{
          console.log('\x1b[33m%s\x1b[0m: ', 'REGISTRO ACTUALIZADOS: '+saldo_vacacion_guardado.length);
        })

      }).catch(function (err) {
        console.log(err);
      });
    }
    /*
     *Fin actualizacion de Saldo de vacaciones
     */
    }
    return updateboleta;
  }).then((boleta_actualizada) => {
    req.flash('success_msg', 'Boleta actualizada correctamene');
    res.redirect('/administrar/boleta');
  }).catch(function (err) {
    console.log(err);
  });;
});
module.exports = router;