var express = require('express');
var md_auth = require('../middleware/authenticated');
var session = require('express-session');
var router = express.Router();

/* GET login page. */
router.get('/', md_auth.ensureAuth, function(req, res, next) {
    console.log(JSON.stringify(res.locals.user));
    var rolData = req.session;
    rolData.rol = "ADMIN1";
    res.render('home');
});

module.exports = router;