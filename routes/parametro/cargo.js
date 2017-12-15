
var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado
router.get('/', md_auth.ensureAuth, function(req, res, next) {

//cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
modelos.sequelize.query('SELECT * FROM public."Areas" WHERE   estado= true').spread((Area, metadata) => {
modelos.sequelize.query('SELECT * FROM public."Escala_Salarials" ').spread((Escala, metadata) => {

res.render('parametro/cargo',{Area:Area, Escala:Escala}); 

})

})
});

router.post('/grabar', (req, res) => {
 
    const descripcion = req.body.descripcion;

    console.log(descripcion+"descripcion"),
    console.log(req.body.tipo_area+"descripcion"),
    console.log(req.body.tipo_escala+"descripcion")

    modelos.Cargo.create({

    cargo : descripcion,
    id_area : req.body.tipo_area,
    id_escala_salarial:req.body.tipo_escala
    })
    .then(newcargo => { 
        modelos.sequelize.query('SELECT * FROM public."Areas" WHERE   estado= true').spread((Area, metadata) => {
            modelos.sequelize.query('SELECT * FROM public."Escala_Salarials" ').spread((Escala, metadata) => {  
            res.render('parametro/cargo',{Area:Area, Escala:Escala}); 
            
            })
            
            })
       });
})

module.exports = router;
