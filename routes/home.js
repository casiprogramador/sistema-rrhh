var express = require('express');
var md_auth = require('../middleware/authenticated');
var router = express.Router();

/* GET login page. */
router.get('/',md_auth.ensureAuth ,function(req, res, next) {
  console.log(res.locals.user.id);
  res.render('home');
});

module.exports = router;