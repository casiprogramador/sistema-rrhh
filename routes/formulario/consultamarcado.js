var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

router.get('/', function (req, res, next) {

  modelos.sequelize.query('SELECT * FROM "Empleados" e, "Usuarios" u, "Contratos" c, "Cargos" a, "Areas" r WHERE e.id_usuario=u.id AND u.id=' + res.locals.user.id + ' AND e.id=c.id_empleado AND c.id_cargo=a.id AND a.id_area=r.id').spread((empleado, metadata) => {
    // console.log('\x1b[33m%s\x1b[0m', JSON.stringify(empleado));
    modelos.sequelize.query('SELECT * FROM "Asistencia" WHERE id=-1').spread((marcados, metadata) => {
      //console.log('\x1b[34m%s\x1b[0m', JSON.stringify(marcados));
      res.render('formularios/consultamarcado', { empleado: empleado, marcados: marcados, moment: moment });
    })
  })
});

router.post('/buscar', function (req, res, next) {
  // console.log(JSON.stringify("entrooo"));


  if (req.body.inicio < req.body.fin) {
    if (req.body.tipo=='completo') {
      console.log('\x1b[33m%s\x1b[0m', "comparar");
      modelos.sequelize.query('SELECT * FROM "Asistencia" a, "Empleados" e, "Usuarios" u, "Contratos" c, "Cargos" g, "Areas" r, "Horarios" h WHERE h.id=a.id_horario AND e.id=c.id_empleado AND c.id_cargo=g.id AND g.id_area=r.id AND a.id_empleado=e.id AND e.id_usuario=u.id AND a.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' AND u.id=" + "'" + res.locals.user.id + "' ORDER BY fecha").spread((marcados, metadata) => {
        //console.log('\x1b[33m%s\x1b[0m', JSON.stringify(marcados));
        res.render('formularios/consultamarcado', { marcados: marcados, moment: moment });
      })
    }
    else {
      modelos.sequelize.query('SELECT * FROM "Asistencia" a, "Empleados" e, "Usuarios" u, "Contratos" c, "Cargos" g, "Areas" r, "Horarios" h WHERE h.id=a.id_horario AND e.id=c.id_empleado AND c.id_cargo=g.id AND g.id_area=r.id AND a.id_empleado=e.id AND e.id_usuario=u.id AND a.fecha BETWEEN ' + "'" + req.body.inicio + "'" + ' AND' + "'" + req.body.fin + "' AND u.id=" + "'" + res.locals.user.id + "' ORDER BY fecha").spread((marcados, metadata) => {
        //console.log('\x1b[33m%s\x1b[0m', JSON.stringify(marcados));
        res.render('formularios/consultamarcado', { marcados: marcados, moment: moment, inicio : req.body.inicio, fin : req.body.fin });
      });
      console.log('\x1b[33m%s\x1b[0m', "else");
    }
  }
  else {
    req.flash('error_msg', 'La fecha inicio no puede ser mayor a la fecha fin');
    res.redirect('/formularios/consultamarcado')
  }
});
module.exports = router;