var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');

/* GET login page. */
router.get('/',function(req, res, next) {
    modelos.Boleta.findAll({
        attributes: ['id', 'fecha_solicitud', 'observacion', 'estado', 'fecha_inicio', 'fecha_fin', 'id_empleado', 'id_tipo_boleta']
    }).then(boletas => {
        //console.log(JSON.stringify(boletas));
        res.render('administrar/boleta', { boletas: boletas });
    });
    });








module.exports = router;