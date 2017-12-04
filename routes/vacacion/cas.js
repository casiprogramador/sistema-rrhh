var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var md_auth = require('../../middleware/authenticated');
/**
 * Formulario CAS
 */
router.get('/', md_auth.ensureAuth, function(req, res, next) {
    res.render('vacacion/cas');
});

router.get('/buscar', md_auth.ensureAuth, function(req, res, next) {

    modelos.Empleado.findAll({
        where: {
            ndi: req.query.ci_empleado
        },
        include: ['cas'],
    }).then(empleado => {
        console.log(JSON.stringify(empleado));
        res.render('vacacion/historico_cas');
    });
    
});

module.exports = router;