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
            modelos.Horario.findAll().then(horarios => {
                res.render('ficha_personal/nuevo_personal', { cargos: cargos, tiposempleado: tiposempleado, horarios:horarios });
            })
        })
    })
});

router.post('/nuevo', md_auth.ensureAuth, function(req, res, next) {
    console.log(JSON.stringify(req.body));
   
});
module.exports = router;