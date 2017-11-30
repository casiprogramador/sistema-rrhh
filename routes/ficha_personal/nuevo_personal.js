var express = require('express');
var router = express.Router();
var md_auth = require('../../middleware/authenticated');
var modelos = require('../../models/index');

/* GET login page. */
router.get('/nuevo', md_auth.ensureAuth,function(req, res, next) {
    res.render('ficha_personal/nuevo_personal');
});

module.exports = router;