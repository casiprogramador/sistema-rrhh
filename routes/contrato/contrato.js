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
        modelos.Cargo.findAll().then((cargos) => {
            res.render('contrato/editar_contrato',{cargos:cargos, contrato: contrato, moment:moment });
        })
        
    });

});

router.post('/editar', function(req, res, next) {


    let fecha_final = (req.body.fecha_fin) ? req.body.fecha_fin : null ;

    let updateContrato = {
        nro_contrato: req.body.nro, 
        fecha_inicio : req.body.fecha_inicio,
        fecha_fin: fecha_final,
        id_cargo: req.body.cargo
    };
    modelos.Contrato.update(updateContrato, { where: { id: req.body.id_contrato } }).then((result) => {
  
        req.flash('success_msg','Contrato modificado exitosamente');
        res.redirect('/contrato');

    })

});

module.exports = router;
