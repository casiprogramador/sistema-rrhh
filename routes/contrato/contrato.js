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

router.get('/editar/:id_contrato', function(req, res, next) {

    modelos.Contrato.findById(req.params.id_contrato).then(contrato => {
        res.render('contrato/editar_contrato.ejs',{contrato: contrato, moment:moment });
    })

});

router.get('/nuevo/:id_empleado', function(req, res, next) {
    res.render('contrato/nuevo_contrato.ejs',{id_empleado: id_empleado, moment:moment });
});

module.exports = router;
