var express = require('express');
var router = express.Router();
var modelos = require('../models/index');

/* GET login page. */
//Consulta de empleados por area
router.get('/:id_area/area', function(req, res, next) {
    modelos.sequelize.query('SELECT  e.*, a.*, o.*, c.* FROM public."Areas" a, public."Cargos" c, public."Contratos" o, public."Empleados" e WHERE a.id=c.id_area and c.id = o.id_cargo and o.id_empleado=e.id and a.id=' + req.params.id_area + ' and e.estado=true').spread((results, metadata) => {
        res.json(results);
    })
});

// Consultas de saldo vacaciones por empleado
router.get('/:id_empleado/saldovacacion', function(req, res, next) {

    if (req.query.estado_empleado == 'activo') {
        estado = 'and e.estado= true';
    } else if (req.query.estado_empleado == 'inactivo') {
        estado = 'and e.estado= false';
    } else {
        estado = '';
    }

    modelos.sequelize.query('SELECT * FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.id=' + req.params.id_empleado + ' and  e.id=c.id_empleado and c.id_cargo=a.id ' + estado + ' and a.id_area=r.id and s.id_empleado = e.id').spread((results, metadata) => {
        res.json(results);
    })
});

//saldo vacaciones por empleado por dni
router.get('/:ndi/saldovacacionndi', function(req, res, next) {
    modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.ndi=' + "'" + Number(req.params.ndi) + "'" + ' and  e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id').spread((results, metadata) => {
        res.json(results);
    })
});

module.exports = router;