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

    modelos.Empleado.findOne({
        where: {
            ndi: req.query.ci_empleado
        },
        include: ['cas'],
    }).then(empleado => {
        if(empleado != null){
            console.log(JSON.stringify(empleado));
            res.render('vacacion/historico_cas',{ empleado: empleado, moment: moment });
        }else{
            req.flash('success_msg','No se encontro personal con CI '+req.query.ci_empleado);
            res.redirect('/vacacion/cas');
        }
        
        
    });
    
});

router.post('/guardar', md_auth.ensureAuth, function(req, res, next) {
     //console.log(newcas);
     modelos.Historico_Cas.update(
        {
           estado: false,
        },
        {
           where: {
                id_empleado: req.body.empleado_id,
           }
        }).then(() => {
            modelos.Historico_Cas.create({ 
                aa: req.body.anio, 
                mm: req.body.mes, 
                dd: req.body.dia,
                fecha: req.body.fecha,
                id_empleado: req.body.empleado_id,
                estado: true,
                codigo_verificacion: req.body.codigo,
                cas: req.body.cas
            }).then(newcas => {
                req.flash('success_msg','Se registro CAS exitosamente');
                res.redirect('/vacacion/cas/buscar?ci_empleado='+req.body.empleado_ndi);
            })
        })

        
    });

module.exports = router;