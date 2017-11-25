var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/* GET login page. */
router.get('/formulario', function(req, res, next) {
    //console.log(moment().format('DD-MM-YYYY'));
    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {
        //console.log(JSON.stringify(areas));
        //res.cookie('cokie' , 'cookie_value').send(areas);
        //console.log("Cookies :  ", req.cookies);
        modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id ORDER BY r.desc_area, e.ndi').spread((results, metadata) => {
            //console.log(JSON.stringify(results));
            res.render('vacacion/saldo', { areas: areas, saldovacaciones: results, moment:moment });
        })
        
    });

});



module.exports = router;