var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/**
 * Formulario de reporte de saldo vacaciones enviando todas las areas
 */
router.get('/formulario', function(req, res, next) {

    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {

        modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE s.prescrito_estado = false and e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id ORDER BY r.desc_area, e.ndi').spread((results, metadata) => {

            res.render('vacacion/saldo', { areas: areas, saldovacaciones: results, moment: moment });
        })

    });

});
/**
 * Busqueda de personal para reporte de saldo de vacaciones por area
 */
router.post('/formulario/buscar', function(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', JSON.stringify(req.body));
    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {
        if (req.body.area == 1) {
            query_area = '';
        } else {
            query_area = ' and r.id=' + req.body.area;
        }

        if (req.body.tipo_personal == 'activo') {
            query_estado = ' and e.estado= true';
        } else if (req.body.tipo_personal == 'inactivo') {
            query_estado = ' and e.estado= false';
        } else {
            query_estado = '';
        }

        modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE s.prescrito_estado = false and e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id' + query_area + query_estado + ' ORDER BY r.desc_area, e.ndi').spread((results, metadata) => {
            //console.log(JSON.stringify(results));
            res.render('vacacion/saldo', { areas: areas, saldovacaciones: results, fecha: req.body.fecha, moment: moment });
        })

    });

});
/**
 * Busqueda de personal para reporte de saldo de vacaciones por dni
 */
router.post('/formulario/buscar/individual', function(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', JSON.stringify(req.body));
    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {

        modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE s.prescrito_estado = false and e.ndi=' + "'" + Number(req.body.ci_empleado) + "'" + 'and e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id ORDER BY r.desc_area, e.ndi').spread((results, metadata) => {
            res.render('vacacion/saldo', { areas: areas, saldovacaciones: results, fecha: req.body.fecha, moment: moment });
        })

    });

});

module.exports = router;