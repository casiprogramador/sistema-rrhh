
var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado
router.get('/', md_auth.ensureAuth, function(req, res, next) {

//cambiar el id de entrada ya que es el de usuario y se necesita el de empleado

res.render('parametro/area'); 
});

router.post('/grabar', (req, res) => {
    
    const descripcion = req.body.descripcion;
    
    modelos.Area.create({
    
    id_area_superior: 1, 
    desc_area : descripcion,
    estado : true,
    nivel: 1,
    ausr:'',
    })
    .then(newarea => { 
    res.render('parametro/area',{feriado:newarea });
    });
    
})
module.exports = router;
