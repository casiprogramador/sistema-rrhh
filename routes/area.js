var express = require('express');
var router = express.Router();
var modelos = require('../models/index');

/* GET login page. */
router.get('/', function(req, res, next) {

    modelos.Area.findAll({
        attributes: ['id','desc_area']
    }).then(areas => {
        res.json(areas);
    });

});

module.exports = router;