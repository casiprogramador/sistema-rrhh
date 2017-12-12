var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

router.get('/', function (req, res, next) {

  modelos.Area.findAll({
    attributes: ['id', 'desc_area']
}).then(areas => {

    modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id ORDER BY r.desc_area, e.ndi').spread((results, metadata) => {

        res.render('reportesAsistencia/reporteAsistenciaAdmin', { areas: areas, saldovacaciones: results, moment: moment });
    })

});
});

router.post('/buscar', function (req, res, next) {
  // console.log(JSON.stringify("entrooo"));
  

  var fecha_inicio=req.body.inicio;
  var fecha_fin=req.body.fin;
  if (req.body.inicio < req.body.fin) {
    if (req.body.tipo=='completo') {
      console.log('\x1b[33m%s\x1b[0m', "comparar");
      modelos.sequelize.query('SELECT * FROM "Asistencia" a, "Empleados" e, "Usuarios" u, "Contratos" c, "Cargos" g, "Areas" r, "Horarios" h WHERE h.id=a.id_horario AND e.id=c.id_empleado AND c.id_cargo=g.id AND g.id_area=r.id AND a.id_empleado=e.id AND e.id_usuario=u.id AND a.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' AND u.id=" + "'" + res.locals.user.id + "' ORDER BY fecha").spread((marcados, metadata) => {
        //console.log('\x1b[33m%s\x1b[0m', JSON.stringify(marcados));
        res.render('reportesAsistencia/reporteAsistenciaAdmin', { marcados: marcados, moment: moment, fecha_inicio: fecha_inicio, fecha_fin : fecha_fin });
      })
    }
    else {
      modelos.sequelize.query('SELECT * FROM "Asistencia" a, "Empleados" e, "Usuarios" u, "Contratos" c, "Cargos" g, "Areas" r, "Horarios" h WHERE h.id=a.id_horario AND e.id=c.id_empleado AND c.id_cargo=g.id AND g.id_area=r.id AND a.id_empleado=e.id AND e.id_usuario=u.id AND (a.observacion_1 IS NOT NULL OR a.observacion_2 IS NOT NULL) AND a.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' AND u.id=" + "'" + res.locals.user.id + "' ORDER BY fecha").spread((marcados, metadata) => {
        //console.log('\x1b[33m%s\x1b[0m', JSON.stringify(marcados));
        res.render('reportesAsistencia/reporteAsistenciaAdmin', { marcados: marcados, moment: moment, fecha_inicio : fecha_inicio, fecha_fin : fecha_fin });
      });
      console.log('\x1b[33m%s\x1b[0m', "else");
    }
  }
  else {
    req.flash('error_msg', 'La fecha inicio no puede ser mayor a la fecha fin');
    res.redirect('/reportesAsistencia/reporteAsistenciaAdmin')
  }
});
module.exports = router;