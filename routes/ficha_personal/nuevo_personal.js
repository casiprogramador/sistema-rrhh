var express = require('express');
var router = express.Router();
var md_auth = require('../../middleware/authenticated');
var modelos = require('../../models/index');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
/**
 * Formulario de registro de nuevo empleado
 */
router.get('/nuevo', md_auth.ensureAuth, function(req, res, next) {
    modelos.Cargo.findAll().then(cargos => {
        //console.log(JSON.stringify(cargos));
        modelos.Tipo_Empleado.findAll().then(tiposempleado => {
            //console.log(JSON.stringify(tiposempleado));
            res.render('ficha_personal/nuevo_personal', { cargos: cargos, tiposempleado: tiposempleado });
        })
    })
});

router.post('/nuevo', md_auth.ensureAuth, function(req, res, next) {
    console.log(JSON.stringify(req.body));
    modelos.Usuario.create({ username: req.body.usuario, password: bcrypt.hashSync(req.body.password, salt), estado: true, resetpwd: true, ultingreso: new Date(), id_rol: 2 }).then(usuario => {
        console.log(JSON.stringify('\x1b[33m%s\x1b[0m', usuario));
        modelos.Empleado.create({ paterno: req.body.paterno, materno: req.body.materno, nombres: req.body.nombre, ndi: req.body.ci, expedido: req.body.expendido, sexo: req.body.sexo, id_usuario: usuario.id, estado: true }).then(empleado => {
            console.log(JSON.stringify('\x1b[33m%s\x1b[0m', empleado));
            modelos.Contrato.create({ fecha_inicio: req.body.fecha, fecha_fin: null, nro_contrato: req.body.contrato, estado: true, id_empleado: empleado.id, id_cargo: req.body.id_cargo, id_tipo_empleado: req.body.id_tipoempleado }).then(contrato => {
                console.log(JSON.stringify('\x1b[33m%s\x1b[0m', empleado));
                res.redirect('/home')
            })
        })
    })

});
module.exports = router;