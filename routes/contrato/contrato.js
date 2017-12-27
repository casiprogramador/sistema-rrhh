var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/* GET todas la areas. */
router.get('/', function(req, res, next) {

    modelos.Contrato.findAll({
       where: { estado: true }, 
       include: ['cargo','empleado']
    }).then(contratos => {
        console.log(JSON.stringify(contratos));
        res.render('contrato/lista_contratos.ejs',{contratos: contratos, moment:moment });
    });

});

router.get('/', function(req, res, next) {

    modelos.Contrato.findAll({
       where: { estado: true }, 
       include: ['cargo','empleado']
    }).then(contratos => {
        console.log(JSON.stringify(contratos));
        res.render('contrato/lista_contratos.ejs',{contratos: contratos, moment:moment });
    });

});

module.exports = router;
