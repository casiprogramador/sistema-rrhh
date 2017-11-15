var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');

/* GET login page. */
router.get('/formulario', function(req, res, next) {
    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {
        //console.log(JSON.stringify(areas));
        res.render('vacacion/saldo', { areas: areas });
    });

});



module.exports = router;