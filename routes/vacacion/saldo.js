var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/* GET login page. */
router.get('/formulario', function(req, res, next) {
    //console.log(moment().format('DD-MM-YYYY'));
    modelos.Area.findAll({
        attributes: ['id', 'desc_area']
    }).then(areas => {
        //console.log(JSON.stringify(areas));
        //res.cookie('cokie' , 'cookie_value').send(areas);
        //console.log("Cookies :  ", req.cookies);
        res.render('vacacion/saldo', { areas: areas });
    });

});



module.exports = router;