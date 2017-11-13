var express = require('express');
var router = express.Router();
var modelos = require('../models/index');

/* GET login page. */
router.get('/:id_area/area', function(req, res, next) {
    modelos.sequelize.query('SELECT  e.*, a.*, o.*, c.* FROM public."Areas" a, public."Cargos" c, public."Contratos" o, public."Empleados" e WHERE a.id=c.id_area and c.id = o.id_cargo and o.id_empleado=e.id and a.id='+req.params.id_area+' and e.estado=true').spread((results, metadata) => {
        res.json(results);
    })
});

router.get('/:id_empleado/saldovacacion', function(req, res, next) {
    modelos.sequelize.query('SELECT * FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.id='+req.params.id_empleado+' and  e.id=c.id_empleado and c.id_cargo=a.id and e.estado= true and a.id_area=r.id and s.id_empleado = e.id').spread((results, metadata) => {
        res.json(results);
    })
});

module.exports = router;