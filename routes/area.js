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

<<<<<<< HEAD
/* GET area especifica. */
router.get('/:id_area', function(req, res, next) {
    modelos.Area.findById(req.params.id_area).then(area => {
        res.json(area);
    });

});
module.exports = router;
=======
module.exports = router;


>>>>>>> 399bb4c888e9e6fdb6da6dc417b751289e6006e5
