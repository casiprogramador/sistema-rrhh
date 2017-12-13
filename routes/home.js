var express = require('express');
var md_auth = require('../middleware/authenticated');
var session = require('express-session');
var router = express.Router();
var modelos = require('../models/index');
/* GET login page. */
router.get('/', md_auth.ensureAuth, function(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m', JSON.stringify(res.locals.user.rol.rol));
    //var rolData = req.session;
    //rolData.rol = "ADMIN1";
    if(res.locals.user.rol.rol == 'ADMIN'){
        modelos.Empleado.count({ where: {'estado': true } }).then(empleados => {
            modelos.Boleta.count({ where: {'estado': 'Pendiente' } }).then(boletas => {
                res.render('home',{numero_empleados: empleados, numero_boleta_pendiente: boletas });
            });
        })
    }
    if(res.locals.user.rol.rol == 'EMPLEADO'){
        modelos.sequelize.query('select e.id,e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.id = '+res.locals.user.empleado.id+' LIMIT 1').spread((empleado, metadata) => {
            res.render('home',{empleado: empleado[0] });
        })
    }

});

module.exports = router;
