var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');

/* GET login page. */
router.getAllAreas('/formulario', function(req, res, next) {
    modelos.Area.findAll({
        attributes: ['desc_area']
    }).then(areas => {
        res.status(200).send(areas);
    });

});

module.exports = router;


