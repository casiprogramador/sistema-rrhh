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

module.exports = router;