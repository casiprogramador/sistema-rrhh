var express = require('express');
var router = express.Router();
var modelos = require('../models/index');

/* GET todas la areas. */
router.get('/', function(req, res, next) {
    modelos.Area.findAll({
        attributes: ['id','desc_area']
    }).then(areas => {
        res.json(areas);
    });

});

/* GET area especifica. */
router.get('/:id_area', function(req, res, next) {
    modelos.Area.findById(req.params.id_area).then(area => {
        res.json(area);
    });

});
module.exports = router;
