var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');


/* GET login page. */
router.get('/formulario', function(req, res, next) {
   // console.log('USUARIO ID'+res.locals.user.id);
    
    modelos.Tipo_boleta.findAll({
        attributes: ['id', 'tipo_boleta']
    }).then(Tipo_boleta => {
        console.log('holaaaaa'+req.body.fecha_fin)
        console.log(JSON.stringify(Tipo_boleta));
        res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
    });
});
/*
app.post('/formulario', function(req, res){
    sumatoria = req.body.fecha_fin
    console.log(sumatoria);
    })
      .then(sumatoria => {
        res.render('boleta/boleta',{sumatoria:sumatoria});
})
*/

//Consulta de boletas por id_usuario
router.get('/:id_area/area', function(req, res, next) {
  
    modelos.sequelize.query('SELECT e.id, e.ndi, e.nombres, c.id_empleado, c.id_tipo_empleado, te.id, te.tipo FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te WHERE e.id = c.id_empleado and c.id_empleado= te.id and e.id='+res.locals.user.id+' and e.estado=true').spread((results, metadata) => {
    res.json(results);
    })
});

  module.exports = router;


