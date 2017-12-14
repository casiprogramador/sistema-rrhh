
var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado
router.get('/', md_auth.ensureAuth, function(req, res, next) {

//cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
modelos.sequelize.query('SELECT * FROM public."Areas" WHERE  e.id = c.id_empleado and c.id_empleado= te.id and c.id_tipo_empleado=teb.id_tipo_empleado and teb.id_tipo_boleta=tb.id and c.id_empleado= 2').spread((Tipo_boleta, metadata) => {
console.log(Tipo_boleta);
res.render('parametro/cargo',{Tipo_boleta:Tipo_boleta,dato:0}); 
})
});

router.post('/grabar', (req, res) => {
var fecha = req.body.fecha_inicio;
const descripcion = req.body.descripcion;

const fecha_convertida = moment(fecha).format("YYYY-MM-DD"+" 00:00:00.000 +00:00");

console.log('\x1b[33m%s\x1b[0m',(moment(fecha_convertida).day()) );
if ( (moment(fecha_convertida).day()) == 6) {

    req.flash('error_msg3', 'No puede insertar un feriado en domingo debe aumentarle un día');
    res.redirect('/feriado');
}
else{


modelos.Feriado.create({
desc_feriado : descripcion,
fecha_feriado : fecha_convertida,
})
.then(newboleta => { 
res.render('parametro/feriado',{feriado:newboleta });
});
}
})

module.exports = router;
