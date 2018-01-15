var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var md_auth = require('../../middleware/authenticated');

/* GET prescripcion page. */
router.get('/', md_auth.ensureAuth, function(req, res, next) {

    modelos.sequelize.query('SELECT e.id, e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.prescrito_estado, min(s.gestion) AS min_gestion , count(s.gestion) AS num_gestiones, r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s where e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id and s.prescrito_estado = false group by e.id, e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, r.desc_area , s.prescrito_estado having count(s.gestion) > 2').spread((results, metadata) => {
        res.render('vacacion/prescripcion', { moment:moment ,empleados: results });
    })

});

router.get('/:id_empleado/saldovacacion', md_auth.ensureAuth, function(req, res, next) {
    modelos.Empleado.findOne({
        where: {
            id: req.params.id_empleado
        },
        include: [{model: modelos.Saldo_Vacacion, as: 'saldovacacion'}],
        order: [
            [{model: modelos.Saldo_Vacacion, as: 'saldovacacion'},
            'gestion',
            'ASC'],
        ]
    }).then(empleado => {
        
        res.json(empleado);
    });
});

router.post('/', md_auth.ensureAuth, function(req, res, next) {
    console.log('ID prescribir:'+(typeof req.body.saldoid));
    if(typeof req.body.saldoid === "string"){
        let updateValue = { prescrito_estado:true };
        modelos.Saldo_Vacacion.update(updateValue, { where: { id: req.body.saldoid } }).then((result) => {
            req.flash('success_msg','Prescripcion actualizada correctamente');
        }); 
    }else if(typeof req.body.saldoid === "object"){
        for (let id_saldo of req.body.saldoid) {
            console.log('SALDO ID:'+id_saldo);
             let updateValue = { prescrito_estado:true };
            modelos.Saldo_Vacacion.update(updateValue, { where: { id: id_saldo } }).then((result) => {
                
            }); 
        }
        req.flash('success_msg','Prescripcion actualizada correctamente'); 
    }else{
        req.flash('success_msg','Error al actualizar');
    }

    req.flash('success_msg','Prescripcion actualizada correctamente');
    res.redirect('/vacacion/prescripcion');
});

module.exports = router;