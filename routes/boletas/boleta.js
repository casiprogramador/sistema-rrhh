var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
var md_auth = require('../../middleware/authenticated');

// Consultas de boletas por empleado
router.get('/formulario', md_auth.ensureAuth, function(req, res, next) {

    //cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
    modelos.sequelize.query('SELECT * FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te, public."Tipo_empleado_boleta" teb, public."Tipo_boleta" tb WHERE e.id = c.id_empleado and c.id_tipo_empleado=te.id and teb.id_tipo_empleado=te.id and teb.id_tipo_boleta=tb.id and c.id_empleado=' + res.locals.user.empleado.id).spread((Tipo_boleta, metadata) => {
        console.log(Tipo_boleta);
        res.render('boleta/boleta', { Tipo_boleta: Tipo_boleta, dato: 0 });
    })
});

router.post('/reporte', (req, res) => {

    const fecha_solicitud = moment().format("YYYY-MM-DD" + " 00:00:00.000 +00:00");
    const observacion = '';
    const estado = 'Pendiente';
    const fecha_inicio = req.body.fecha_inicio + ' ' + req.body.hora_inicio + '.000 +00:00';
    const fecha_fin = req.body.fecha_fin + ' ' + req.body.hora_fin + '.000 +00:00';
    const fecha_inicio1 = req.body.fecha_inicio;
    const fecha_fin1 = req.body.fecha_fin;
    const hora_inicio = req.body.hora_inicio;
    const hora_fin = req.body.hora_fin;
    const id_empleado = res.locals.user.empleado.id;
    const id_tipo_boleta = req.body.tipo_boleta;
    const inicio = moment(hora_inicio, 'HH:mm');
    const fin = moment(hora_fin, 'HH:mm');
    const suma_horas = (moment.duration(fin - inicio)) / 3600000;

    var dias_restados = moment(fecha_fin).diff(moment(fecha_inicio), "days");
    const dias_total = moment(fecha_fin).diff(moment(fecha_inicio), "days");
    var contador = 0;
    var fecha_prueba = fecha_inicio;
    var fecha_pruebas= moment().format("YYYY-MM-DD");
    var fecha_fer = fecha_inicio;
    var i = 0;
    var j = 0;
    var k = 0;
    
    var au_horas = 0;
    const solicitud_boleta =  (moment(fecha_inicio).diff(moment(), "days"))+1;
    var fecha_solicitud_boleta = moment().format("YYYY-MM-DD");
    var contador1=solicitud_boleta;
       while (k <= solicitud_boleta) {
           if ((moment(fecha_pruebas).day()) == 6 || (moment(fecha_pruebas).day()) == 0) {
        
            contador1 = contador1-1;
            }

            fecha_pruebas = (moment(fecha_pruebas).add(1, 'd')).format("YYYY-MM-DD");
            k = k + 1;
        }
        if(contador1 < 4)
        {
            req.flash('error_msg', 'Debe solicitar su boleta 5 días antes como mínimo');
            res.redirect('/boleta/formulario');
        }
    //Verifica si la fecha inicio es menor a la fecha fin
    if (fecha_inicio1 > fecha_fin1) {
        req.flash('error_msg', 'La fecha inicio no puede ser mayor a la fecha fin');
        res.redirect('/boleta/formulario');
    } else {
        //Verifica si la hora inicio es menor a la hora fin
        if (hora_fin < hora_inicio) {
            req.flash('error_msg2', 'La hora inicio no puede ser mayor a la hora fin');
            res.redirect('/boleta/formulario');
        } else {
            if (suma_horas <= 4) {
                au_horas = 0.5;
            } else {
                au_horas = 1;
            }
        }

    }
    while (i <= dias_total) {
        if ((moment(fecha_prueba).day()) == 6 || (moment(fecha_prueba).day()) == 0) {
            dias_restados = dias_restados - 1;
        }
        //console.log('\x1b[33m%s\x1b[0m',moment(fecha_prueba).format('YYYY-MM-DD'));
        fecha_prueba = (moment(fecha_prueba).add(1, 'd')).format("YYYY-MM-DD");
        i = i + 1;
    }

    var suma_dias = dias_restados;

    //Verifica si la boleta que esta sacando es a cuenta de vacacion
    if (req.body.tipo_boleta == 1 || req.body.tipo_boleta == 2) {
        modelos.sequelize.query('SELECT sum(dias)vacacion_dias FROM public."Saldo_Vacacions" WHERE id_empleado=' + res.locals.user.empleado.id + 'and prescrito_estado = false GROUP BY id_empleado').spread((sumatoria, metadata) => {
            //verifica en saldo vacacion si puede pedir permiso  
            let fecha_vacacion = moment(fecha_fer).format('YYYY-MM-DD');
            modelos.Feriado.findAll().then(feriados => {

                while (j <= suma_dias) {
                    for (var feriado of feriados) {
             
                        if (moment(feriado.fecha_feriado).format('YYYY-MM-DD') == fecha_vacacion) {
                            contador = contador + 1;
                            //console.log(moment(fecha_prueba).format('YYYY-MM-DD'));
                            console.log(contador + 'iteracion ennntroooo');
                        }

                    }
                    fecha_vacacion = (moment(fecha_vacacion).add(1, 'd')).format("YYYY-MM-DD");
                    j = j + 1;
                };
                suma_dias = suma_dias - contador;
                console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(sumatoria));
                console.log('\x1b[33m%s\x1b[0m', sumatoria.vacacion_dias);
                if (suma_dias <= Number(sumatoria[0].vacacion_dias)) {
                    modelos.Boleta.create({
                            fecha_solicitud: fecha_solicitud,
                            observacion: observacion,
                            estado: estado,
                            fecha_inicio: fecha_inicio,
                            fecha_fin: fecha_fin,
                            id_empleado: id_empleado,
                            id_tipo_boleta: id_tipo_boleta,
                            dias: suma_dias + au_horas,
                            codigo: id_tipo_boleta,
                        })
                        .then(newboleta => {
                            modelos.sequelize.query('SELECT te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, c.cargo, a.desc_area  FROM public."Tipo_boleta" te, public."Empleados" e, public."Cargos" c, public."Areas" a, , public."Contratos" co  where e.id=' + id_empleado + ' and te.id=' + id_tipo_boleta + ' and c.id_area=a.id and co.id_empleado=e.id and co.id_cargo = c.id').spread((datos_boleta, metadata) => {

                                const fecha_inicio_repor = moment(fecha_inicio1).format("YYYY-MM-DD") + ' ' + hora_inicio;
                                const fecha_fin_repor = moment(fecha_fin1).format("YYYY-MM-DD") + ' ' + hora_fin;
                                const fecha_solicitud1 = moment(fecha_solicitud).format("YYYY-MM-DD" +' '+ 'HH:mm');
     
                                res.render('boleta/reporte', { boleta: datos_boleta, boleta_insertada: newboleta, variable: suma_dias, variable1: fecha_inicio_repor, variable2: fecha_fin_repor, variable3: fecha_solicitud1});
                            });
                        })
                }
                //en caso de que este pidiendo vacaciones y estos sias sobrepasan su saldo sale un mensaje
                else {
                    req.flash('error_msg1', 'No puede pedir ese tiempo de vacación');
                    res.redirect('/boleta/formulario');
                }

            })
        });
    }
    //grabado de boletas normales 
    else {
        let fecha_vacacion = moment(fecha_fer).format('YYYY-MM-DD');
        modelos.Feriado.findAll().then(feriados => {

            while (j <= suma_dias) {
                for (var feriado of feriados) {
                    // console.log('\x1b[33m%s\x1b[0m', moment(feriado.fecha_feriado).format('YYYY-MM-DD'));
                    if (moment(feriado.fecha_feriado).format('YYYY-MM-DD') == fecha_vacacion) {
                        contador = contador + 1;
                    }
                }
                fecha_vacacion = (moment(fecha_vacacion).add(1, 'd')).format("YYYY-MM-DD");
                j = j + 1;
            };
            modelos.Boleta.create({
                fecha_solicitud: fecha_solicitud,
                observacion: observacion,
                estado: estado,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                id_empleado: id_empleado,
                id_tipo_boleta: id_tipo_boleta,
                dias: suma_dias - contador + au_horas,
                codigo: id_tipo_boleta,
            }).then(newboleta => {
                modelos.sequelize.query('SELECT te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, c.cargo, a.desc_area  FROM public."Tipo_boleta" te, public."Empleados" e, public."Cargos" c, public."Areas" a, public."Contratos" co  where e.id=' + id_empleado + ' and te.id=' + id_tipo_boleta + ' and c.id_area=a.id and co.id_empleado=e.id and co.id_cargo = c.id').spread((datos_boleta, metadata) => {

                    const fecha_inicio_repor = moment(fecha_inicio1).format("YYYY-MM-DD") + ' ' + hora_inicio;
                    const fecha_fin_repor = moment(fecha_fin1).format("YYYY-MM-DD") + ' ' + hora_fin;
                    const fecha_solicitud1 = moment(fecha_solicitud).format("YYYY-MM-DD" +' '+ 'HH:mm');
                    res.render('boleta/reporte', { boleta: datos_boleta, boleta_insertada: newboleta, variable: suma_dias, variable1: fecha_inicio_repor, variable2: fecha_fin_repor, variable3: fecha_solicitud1 });
                });
            })
        })
    }
});

router.get('/suma', (req, res) => {
    console.log(req.query.fecha_inicio);
    console.log(req.query.hora_inicio);
    console.log(req.query.fecha_fin);
    console.log(req.query.hora_fin);
    console.log(req.query.id_empleado);
    console.log(req.query.id_tipo_boleta);
    const fecha_solicitud = moment().format("YYYY-MM-DD" + " 00:00:00.000 +00:00");
    const observacion = '';
    const estado = 'PENDIENTE';
    const fecha_inicio = req.query.fecha_inicio + ' ' + req.query.hora_inicio + '.000 +00:00';
    const fecha_fin = req.query.fecha_fin + ' ' + req.query.hora_fin + '.000 +00:00';
    const fecha_inicio1 = req.query.fecha_inicio;
    const fecha_fin1 = req.query.fecha_fin;
    const hora_inicio = req.query.hora_inicio;
    const hora_fin = req.query.hora_fin;
    const id_empleado = req.query.id_empleado;
    const id_tipo_boleta = req.query.id_tipo_boleta;
    const inicio = moment(hora_inicio, 'HH:mm');
    const fin = moment(hora_fin, 'HH:mm');
    const suma_horas = (moment.duration(fin - inicio)) / 3600000;

    var dias_restados = moment(fecha_fin).diff(moment(fecha_inicio), "days");

    var dias_total = moment(fecha_fin).diff(moment(fecha_inicio), "days");

    var contador = 0;
    var fecha_prueba = fecha_inicio;
    var fecha_fer = fecha_inicio;
    var i = 0;
    var j = 0;
    var au_horas = 0;

    //Verifica si la fecha inicio es menor a la fecha fin
    if (fecha_inicio1 > fecha_fin1) {
        res.json({ dias: 0 });
    } else {

        if (suma_horas <= 4) {
            au_horas = 0.5;
        } else {
            au_horas = 1;
        }


    }
    while (i != dias_total) {
        if ((moment(fecha_prueba).day()) == 6 || (moment(fecha_prueba).day()) == 0) {
            dias_restados = dias_restados - 1;
        }

        fecha_prueba = (moment(fecha_prueba).add(1, 'd')).format("YYYY-MM-DD");
        i = i + 1;
    }

    var suma_dias = dias_restados;

    modelos.Feriado.findAll().then(feriados => {
        var fecha_vacacion = moment(fecha_fer).format('YYYY-MM-DD');
        while (j <= suma_dias) {
            for (var feriado of feriados) {
                // console.log('\x1b[33m%s\x1b[0m', moment(feriado.fecha_feriado).format('YYYY-MM-DD'));
                if (moment(feriado.fecha_feriado).format('YYYY-MM-DD') == fecha_vacacion) {
                    contador = contador + 1;
                }
            }
            fecha_vacacion = (moment(fecha_vacacion).add(1, 'd')).format("YYYY-MM-DD");
            j = j + 1;
        };

        dias = suma_dias - contador + au_horas,
            res.json({ dias: dias });

    })
});







module.exports = router;