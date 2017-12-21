var express = require('express');
var router = express.Router();
var modelos = require('../models/index');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

/* GET users listing. */
router.get('/', function(req, res, next) {
  modelos.Usuario.findAll({
    where: {
      id_rol: 2
    },
    include: ['rol', 'empleado']
  }).then(usuarios => {
    res.render('usuarios/listausuarios', { usuarios: usuarios });
  });
});

router.get('/resetpassword/:id_user', function(req, res, next) {
  modelos.Usuario.findOne({
    where: {
      id: req.params.id_user
    },
    include: ['rol', 'empleado']
  }).then(usuario => {
    
    let updateValues = { resetpwd: true, password:bcrypt.hashSync(usuario.empleado.ndi, salt) };
          
    modelos.Usuario.update(updateValues, { where: { id: req.params.id_user } }).then((userupdate) => {
        //res.json(usuario.empleado.ndi);
        res.json(userupdate);
    });
  });
});

module.exports = router;
