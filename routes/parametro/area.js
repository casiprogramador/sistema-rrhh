
var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado
router.get('/', md_auth.ensureAuth, function(req, res, next) {

    modelos.sequelize.query('SELECT * FROM public."Areas" WHERE   estado= true').spread((Area, metadata) => {
        console.log(Area);
        res.render('parametro/area',{Area:Area}); 
        })
});

router.post('/grabar', (req, res) => {
    
    const descripcion = req.body.descripcion;
    
    modelos.Area.create({
    
    id_area_superior: req.body.tipo_area, 
    desc_area : descripcion,
    estado : (req.body.estado=='on'?'TRUE':'FALSE'),
    nivel: req.body.nivel,
    ausr:'',
    })
    .then(newarea => { 
    
        modelos.sequelize.query('SELECT * FROM public."Areas" WHERE   estado= true').spread((Area, metadata) => {
     
            res.render('parametro/area',{Area:Area}); 
            })
    });
    
})
module.exports = router;
