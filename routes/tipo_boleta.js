var express = require('express');
var router = express.Router();
var modelos = require('../models/index');

/* GET login page. */
router.get('/', function(req, res, next) {

    modelos.Tipo_boleta.findAll({
        attributes: ['id','tipo_boleta']
    }).then(Tipo_boletas => {
        res.json(Tipo_boletas);
    });

});



module.exports = router;