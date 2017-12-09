var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

  router.get('/marcacion', function(req, res, cb) {
    res.render('marcacion/marcacion');
    })
    
module.exports = router;