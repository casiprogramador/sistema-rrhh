var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/saldo', function(req, res, next) {
  res.render('/vacacion/saldo');
});

module.exports = router;