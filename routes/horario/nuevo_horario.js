var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado

router.get('/', md_auth.ensureAuth, function(req, res, next) {
  
  //cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
  modelos.sequelize.query('SELECT tb.id, tb.tipo_boleta FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te, public."Tipo_empleado_boleta" teb, public."Tipo_boleta" tb WHERE e.id = c.id_empleado and c.id_empleado= te.id and c.id_tipo_empleado=teb.id_tipo_empleado and teb.id_tipo_boleta=tb.id and c.id_empleado= 2').spread((Tipo_boleta, metadata) => {
  res.render('horario/nuevo_horario',{Tipo_boleta:Tipo_boleta,dato:0}); 
  })
  });

  router.post('/grabar', (req, res) => {

  
    modelos.Horario.create({

        descripcion:req.body.descripcion,
        min_entrada_1:req.body.min_entrada_1,
        max_entrada_1:req.body.max_entrada_1,
        entrada_1:req.body.entrada_1,
        tolerancia_entrada_1:req.body.tolerancia_entrada_1,
        min_salida_1:req.body.min_salida_1,
        max_salida_1:req.body.max_salida_1,
        salida_1:req.body.salida_1,
        tolerancia_salida_1:req.body.tolerancia_salida_1,

        min_entrada_2:req.body.min_entrada_2,
        max_entrada_2:req.body.max_entrada_2,
        entrada_2:req.body.entrada_2,
        tolerancia_entrada_2:req.body.tolerancia_entrada_2,
        min_salida_2:req.body.min_salida_2,
        max_salida_2:req.body.max_salida_2,
        salida_2:req.body.salida_2,
        tolerancia_salida_2:req.body.tolerancia_salida_2,

    
        })
        .then(newhorario => { 
        req.flash('success_msg','Horario creado correctamente');
        res.redirect('/horario/lista_horario');
        });
   })

router.post('/modificar', (req, res) => {

    console.log('\x1b[36m%s\x1b[0m',JSON.stringify(req.body));
    let updateHorario = { 

            descripcion:req.body.descripcion,
            min_entrada_1:req.body.min_entrada_1,
            max_entrada_1:req.body.max_entrada_1,
            entrada_1:req.body.entrada_1,
            tolerancia_entrada_1:req.body.tolerancia_1,
            min_salida_1:req.body.min_salida_1,
            max_salida_1:req.body.max_salida_1,
            salida_1:req.body.salida_1,
            tolerancia_salida_1:req.body.tolerancia_salida_1,
    
            min_entrada_2:req.body.min_entrada_2,
            max_entrada_2:req.body.max_entrada_2,
            entrada_2:req.body.entrada_2,
            tolerancia_entrada_2:req.body.tolerancia_entrada_2,
            min_salida_2:req.body.min_salida_2,
            max_salida_2:req.body.max_salida_2,
            salida_2:req.body.salida_2,
            tolerancia_salida_2:req.body.tolerancia_salida_2,
            estado:(req.body.estado=='on'?'TRUE':'FALSE')
            
        };
        modelos.Horario.update(updateHorario, { where: { id: req.body.id_hora } }).then((result) => {
  
            req.flash('success_msg','Horario modificado correctamente');
           res.redirect('/horario/lista_horario');

        })

        });
module.exports = router;