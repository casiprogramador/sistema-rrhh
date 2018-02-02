var express = require('express');
var router = express.Router();
var modelos = require('../models/index');
var md_auth = require('../middleware/authenticated');
var moment = require('moment');

/* GET principal page. */
router.get('/', md_auth.ensureAuth, function(req, res, next) {

    modelos.sequelize.query('select e.id,e.ndi,e.estado , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.estado=true').spread((Empleado, metadata) => {
        res.render('empleados/lista_empleados', { Empleado: Empleado, opcion_estado:1});
    })
});

router.get('/editar/:id_empleado', md_auth.ensureAuth,  (req, res) => {
    modelos.sequelize.query('select e.id,e.estado, e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, e.id_horario, c.id as id_contrato, c.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.id='+req.params.id_empleado).spread((empleado, metadata) => {
     
        modelos.Horario.findAll({
          where: {
              estado: true
          }
       }).then((combo_horario) => {
  
            modelos.Contrato.findAll({
                where: {
                    estado: true
                }
            }).then((combo_contrato) => {
        
                res.render('empleados/editar_datos', {empleado:empleado, combo_horario:combo_horario, combo_contrato:combo_contrato})
        
            })
  
        })
    })
});

//BUsqueda por estado del empleado (Activo , inactivos o ambos)
router.get('/buscar', md_auth.ensureAuth, function(req, res, next) {
    console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(req.query));
    var query = 'select e.id,e.ndi ,e.estado, e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.estado=true';
    if(req.query.estado == 1){
        var query = 'select e.id,e.ndi,e.estado , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.estado=true';
    }else if(req.query.estado == 0){
        query = 'select e.id,e.ndi,e.estado , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.estado=false';
    }else{
        query = 'select e.id,e.ndi ,e.estado, e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id';
    }

    modelos.sequelize.query(query).spread((Empleado, metadata) => {
        res.render('empleados/lista_empleados', { Empleado: Empleado, opcion_estado:req.query.estado});
    })
});

//Editar
router.post('/editar', (req, res) => {

    let updateEmpleado = { 
        id_horario : req.body.id_horario,
        estado: req.body.estado
    };
    modelos.Empleado.update(updateEmpleado, { where: { id: req.body.id_empleado } }).then((result) => {
  
        let updateContrato = { 
            id_empleado : req.body.id_empleado,
        };
        modelos.Contrato.update(updateContrato, { where: { id: req.body.id_contrato } }).then((result) => {
      
            req.flash('success_msg','Datos modificados exitosamente');
            res.redirect('/empleado');
    
        })

    })

});

//Consulta de empleados por area
router.get('/:id_area/area', function(req, res, next) {
    modelos.sequelize.query('SELECT  e.*, a.*, o.*, c.* FROM public."Areas" a, public."Cargos" c, public."Contratos" o, public."Empleados" e WHERE a.id=c.id_area and c.id = o.id_cargo and o.id_empleado=e.id and a.id=' + req.params.id_area + ' and e.estado=true').spread((results, metadata) => {
        res.json(results);
    })
});

// Consultas de saldo vacaciones por empleado
router.get('/:id_empleado/saldovacacion', function(req, res, next) {

    if (req.query.estado_empleado == 'activo') {
        estado = 'and e.estado= true';
    } else if (req.query.estado_empleado == 'inactivo') {
        estado = 'and e.estado= false';
    } else {
        estado = '';
    }

    modelos.sequelize.query('SELECT * FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.id=' + req.params.id_empleado + ' and  e.id=c.id_empleado and c.id_cargo=a.id ' + estado + ' and a.id_area=r.id and s.id_empleado = e.id').spread((results, metadata) => {
        res.json(results);
    })
});

//saldo vacaciones por empleado por dni
router.get('/:ndi/saldovacacionndi', function(req, res, next) {
    modelos.sequelize.query('SELECT e.ndi, e.materno, e.paterno, e.nombres, a.cargo, c.fecha_inicio, s.gestion, s.dias , r.desc_area FROM public."Empleados" e, public."Contratos" c, public."Cargos" a , public."Areas" r, public."Saldo_Vacacions" s WHERE e.ndi=' + "'" + Number(req.params.ndi) + "'" + ' and  e.id=c.id_empleado and c.id_cargo=a.id and a.id_area=r.id and s.id_empleado = e.id').spread((results, metadata) => {
        res.json(results);
    })
});

module.exports = router;