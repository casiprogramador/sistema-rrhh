var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

router.get('/', function (req, res, next) {

  modelos.Area.findAll({
    attributes: ['id', 'desc_area']
  }).then(areas => {
    //consula marcados de empleados activos e inactivos de todas las areas
    modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.estado=true AND s.id_empleado = e.id ORDER BY e.id, s.id').spread((results, metadata) => {

      res.render('reportesAsistencia/reporteAsistenciaArea', { areas: areas, reporteAsistencia: results, moment: moment, marcados: results });
    })

  });
});

router.post('/reporte', function (req, res, next) {
  // console.log(JSON.stringify("entrooo"));
  modelos.Area.findAll({
    attributes: ['id', 'desc_area']
  }).then(areas => {

    var fecha_inicio = req.body.inicio;
    var fecha_fin = req.body.fin;

    if (req.body.inicio < req.body.fin) {
      if (req.body.tipo == 'completo') {

        switch (req.body.tipo_personal) {
          case 'activo':
            
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND  e.estado=true AND  s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              console.log('\x1b[33m%s\x1b[0m',JSON.stringify(results));
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin });
              
            })
            break;
          case 'inactivo':
            console.log('\x1b[33m%s\x1b[0m', "inactivoooo");
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND  e.estado=false AND  s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin });
            })
            break;
          case 'todos':
            console.log('\x1b[33m%s\x1b[0m', "inactivoooo");
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND  s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment, fecha_inicio: fecha_inicio, fecha_fin: fecha_fin });
            })
            break;
        }

      }
      else {
        switch (req.body.tipo_personal) {
          case 'activo':
            console.log('\x1b[33m%s\x1b[0m', "observacionesactivooooo");
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND (s.observacion_entrada_1 IS NOT NULL OR s.observacion_salida_1 IS NOT NULL OR s.observacion_entrada_2 IS NOT NULL OR s.observacion_salida_2 IS NOT NULL) AND e.estado=true AND  s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment , fecha_inicio: fecha_inicio, fecha_fin: fecha_fin});
            })
            break;
          case 'inactivo':
            console.log('\x1b[33m%s\x1b[0m', "observacionesinactivoooo");
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND  (s.observacion_entrada_1 IS NOT NULL OR s.observacion_salida_1 IS NOT NULL OR s.observacion_entrada_2 IS NOT NULL OR s.observacion_salida_2 IS NOT NULL) AND e.estado=false AND  s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment , fecha_inicio: fecha_inicio, fecha_fin: fecha_fin});
            })
            break;
          case 'todos':
            console.log('\x1b[33m%s\x1b[0m', "observacionesinactivoooo");
            modelos.sequelize.query('SELECT * FROM "Areas" a, "Cargos" c, "Contratos" o, "Empleados" e, "Asistencia" s, "Horarios" h WHERE a.id=c.id_area and c.id=o.id_cargo AND o.id_empleado =e.id AND e.id = s.id_empleado  AND s.id_horario=h.id AND  (s.observacion_entrada_1 IS NOT NULL OR s.observacion_salida_1 IS NOT NULL OR s.observacion_entrada_2 IS NOT NULL OR s.observacion_salida_2 IS NOT NULL) AND s.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' and a.id=" + req.body.area + ' ORDER BY e.id, s.id').spread((results, metadata) => {
              res.render('reportesAsistencia/reporte', { areas: areas, reporteAsistencia: results, moment: moment , fecha_inicio: fecha_inicio, fecha_fin: fecha_fin});
            })
            break;
        }

      }
    }
    else {
      req.flash('error_msg', 'La fecha inicio no puede ser mayor a la fecha fin');
      res.redirect('/reportesAsistencia/reporteAsistenciaArea')
    }
  })
});
module.exports = router;