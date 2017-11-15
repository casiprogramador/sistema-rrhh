var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');

/* GET login page. */
router.get('/formulario', function(req, res, next) {
    //console.log('USUARIO ID'+res.locals.user.id);
    
    modelos.Tipo_boleta.findAll({
        attributes: ['id', 'tipo_boleta']
    }).then(Tipo_boleta => {
        
        console.log(JSON.stringify(Tipo_boleta));
        res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
    });
});
//Consulta de boletas por empleados
router.get('/:id_boleta/boleta', function(req, res, next) {
    modelos.sequelize.query('select e.id, e.nombres, e.sexo, t.tipo from "Empleados" e, "Contratos" c, "Tipo_Empleados" t where e.id='+req.params.id_boleta+' and e.id=c.id_empleado and c.id_tipo_empleado=t.id and t.id='+req.params.id_boleta+' and e.estado=true').spread((results, metadata) => {
    res.json(results);
    })
    });
  
module.exports = router;



