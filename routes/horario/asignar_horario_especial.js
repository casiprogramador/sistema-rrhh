var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Grabado de horario unico
router.post('/grabar_unico', (req, res) => {
    
      
        modelos.Horario_especial.create({
    
            fecha:req.body.fecha,
            id_empleado:req.body.id,
            id_horario:req.body.horario
        
            })
            .then(newhorario => { 
            req.flash('success_msg','Horario grabado correctamente');
            res.redirect('/horario/lista_asignacion_horario');
            });
       })
    
// Grabado de horario por periodo
router.post('/grabar_especial', (req, res) => {
    var i = 0;
    const dias_total = moment(req.body.fecha_fin).diff(moment(req.body.fecha_inicio), "days");
    var dias_restados = moment(req.body.fecha_fin).diff(moment(req.body.fecha_inicio), "days");
    var fecha_prueba = moment(req.body.fecha_inicio).format("YYYY-MM-DD");
    const lunes = 1;
    const martes = 2;
    const miercoles = 3;
    const jueves = 5;
    const viernes =5;

    while (i <= dias_total) {
     
        if ((moment(fecha_prueba).day()) == 6 || (moment(fecha_prueba).day()) == 0) {
            dias_restados = dias_restados - 1;
        }
        else
        {
            if(req.body.lunes=='on' && (moment(fecha_prueba).day()) == lunes)
            {        
                modelos.Horario_especial.create({
                fecha:fecha_prueba,
                id_empleado:req.body.id,
                id_horario:req.body.horario_especial
                })
                .then(newhorario => { 
                    
                });
            }
            if(req.body.martes=='on' && (moment(fecha_prueba).day()) == martes)
             {
                modelos.Horario_especial.create({
                fecha:fecha_prueba,
                id_empleado:req.body.id,
                id_horario:req.body.horario_especial
                })
                .then(newhorario => { 
                    
                });

            }
                
            if(req.body.miercoles=='on' && (moment(fecha_prueba).day()) == miercoles)
            {
                modelos.Horario_especial.create({
                fecha:fecha_prueba,
                id_empleado:req.body.id,
                id_horario:req.body.horario_especial
                })
                .then(newhorario => { 
                    
                });
            }             
            if(req.body.jueves=='on' && (moment(fecha_prueba).day()) == jueves)
            {
                modelos.Horario_especial.create({
                fecha:fecha_prueba,
                id_empleado:req.body.id,
                id_horario:req.body.horario_especial
                })
                .then(newhorario => { 
                 
                });

            }              
            if(req.body.viernes=='on' && (moment(fecha_prueba).day()) == viernes)
            {
                modelos.Horario_especial.create({
                fecha:fecha_prueba,
                id_empleado:req.body.id,
                id_horario:req.body.horario_especial
                })
                .then(newhorario => { 
               
                });
            }        
        }
   
        fecha_prueba = (moment(fecha_prueba).add(1, 'd')).format("YYYY-MM-DD");
        i = i + 1;
    }
    req.flash('success_msg','Horario grabado correctamente');
    res.redirect('/horario/lista_asignacion_horario');
       })

module.exports = router;