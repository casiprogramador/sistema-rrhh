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
  console.log(Tipo_boleta);
  res.render('horario/nuevo_horario',{Tipo_boleta:Tipo_boleta,dato:0}); 
  })
  });

  router.post('/grabar', (req, res) => {

  
    modelos.Horario.create({

        descricion:req.body.descripcion,
        min_entrada_1:req.body.min_entrada_1,
        max_entrada_1:req.body.max_entrada_1,
        entrada_1:req.body.entrada_1,
        tolerancia_entrada_1:req.body.tolerancia_1,
        min_salida_1:req.body.min_entrada_2,
        max_salida_1:req.body.max_entrada_2,
        salida_1:req.body.entrada_2,
        tolerancia_salida_1:req.body.tolerancia_2,

        min_entrada_2:req.body.min_entrada_3,
        max_entrada_2:req.body.max_entrada_3,
        entrada_2:req.body.entrada_3,
        tolerancia_entrada_2:req.body.tolerancia_3,
        min_salida_2:req.body.min_entrada_4,
        max_salida_2:req.body.max_entrada_4,
        salida_2:req.body.entrada_4,
        tolerancia_salida_2:req.body.tolerancia_4,

    
        })
        .then(newhorario => { 
        res.render('horario/nuevo_horario',{horario:newhorario });
        });


    
    console.log('\x1b[33m%s\x1b[0m',req.body.min_entrada_1);
   })

router.post('/modificar', (req, res) => {
    
      console.log("entrooo"+ req.body.id);



      for (let id_horario of req.body.id) {
        console.log(id_horario);
        let updateHorario = { 

            descricion:req.body.descripcion,
            min_entrada_1:req.body.min_entrada_1,
            max_entrada_1:req.body.max_entrada_1,
            entrada_1:req.body.entrada_1,
            tolerancia_entrada_1:req.body.tolerancia_1,
            min_salida_1:req.body.min_entrada_2,
            max_salida_1:req.body.max_entrada_2,
            salida_1:req.body.entrada_2,
            tolerancia_salida_1:req.body.tolerancia_2,
    
            min_entrada_2:req.body.min_entrada_3,
            max_entrada_2:req.body.max_entrada_3,
            entrada_2:req.body.entrada_3,
            tolerancia_entrada_2:req.body.tolerancia_3,
            min_salida_2:req.body.min_entrada_4,
            max_salida_2:req.body.max_entrada_4,
            salida_2:req.body.entrada_4,
            tolerancia_salida_2:req.body.tolerancia_4,
        };
        modelos.Horario.update(updateHorario, { where: { id: id_horario } }).then((result) => {
  
            req.flash('success_msg','Horario modificado correctamente');
       
            res.render('horario/nuevo_horario');

        });
    }

        });
module.exports = router;