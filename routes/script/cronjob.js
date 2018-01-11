var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var Sequelize = require('sequelize');

//Consulta de empleados por area
router.get('/calcularvacacion', function(req, res, next) {
    
    modelos.sequelize.query('SELECT public."Empleados".id,public."Historico_Cas".id as id_cas, public."Contratos".fecha_inicio, public."Historico_Cas".aa, public."Historico_Cas".mm, public."Historico_Cas".dd , public."Tipo_Empleados".id as id_tipo FROM public."Empleados" INNER JOIN  public."Contratos" ON public."Contratos".id_empleado = public."Empleados".id INNER JOIN  public."Tipo_Empleados" ON public."Tipo_Empleados".id  = public."Contratos".id_tipo_empleado LEFT JOIN  public."Historico_Cas" ON public."Historico_Cas".id_empleado = public."Empleados".id  WHERE public."Empleados".estado = true and public."Contratos".estado = true and public."Tipo_Empleados".id = 1 and public."Historico_Cas".estado = true').spread(
        (empleados, metadata) => {
            return empleados;
        }).then(empleados=>{
            //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(empleados));
            id_empleados = [];

            var fecha_requerida = moment().startOf('day').format('YYYY-MM-DD');

            if (req.query.fecha) {
                fecha_requerida = moment(req.query.fecha).startOf('day').format('YYYY-MM-DD');
            }
            
            for(const empleado of empleados){
                //Obtenemos la antiguedad , en caso de tener CAS lo calculamos segun sus años 
                
                var antiguedad = 0;
                if(empleado.id_cas == null){
                    antiguedad = moment().diff(empleado.fecha_inicio, 'years');
                }else{
                    antiguedad = empleado.aa;
                }

                var dias_vacacion = 0;

                if(antiguedad > 0){
                    if(antiguedad>=1 && antiguedad<=5){
                        dias_vacacion = 15; 
                    }else if(antiguedad>1 && antiguedad<=10){
                        dias_vacacion = 20; 
                    }else if(antiguedad > 10){
                        dias_vacacion = 30; 
                    }else{
                        dias_vacacion = 0; 
                    }

                    
                    anio_inicio = moment(empleado.fecha_inicio).format('YYYY');
                    //anio_actual = moment().format('YYYY');
                    anio_actual = moment(fecha_requerida).format('YYYY');

                    fecha_inicio = moment(empleado.fecha_inicio).startOf('day').format('YYYY-MM-DD');
                    fecha_actual = moment(fecha_requerida).startOf('day').format('YYYY-MM-DD');
                    //fecha_actual = '2018-01-05';


                    console.log('\x1b[33m%s\x1b[0m: ','EMPLEADO ID:'+empleado.id);
                    console.log('\x1b[33m%s\x1b[0m: ','FECHA INICIO:'+fecha_inicio);
                    console.log('\x1b[33m%s\x1b[0m: ','FECHA ACTUAL:'+fecha_actual);
                    fecha = fecha_inicio;
                    //console.log('\x1b[33m%s\x1b[0m: ','FECHA:'+fecha);
                    //console.log('\x1b[33m%s\x1b[0m: ','DIFF DIAS:'+moment().diff(fecha, 'days'));
                    //fecha = (moment(fecha).add(1, 'y')).format("YYYY-MM-DD");
                    //console.log('\x1b[33m%s\x1b[0m: ','FECHA NUEVO:'+fecha);
                    //console.log('\x1b[33m%s\x1b[0m: ','DIFF DIAS:'+moment().diff(fecha, 'days'));
                    diff_dias = moment(fecha_actual).startOf('day').hour(12).diff(fecha, 'days');

                    while( diff_dias >= 0){
                        
                        //console.log('\x1b[33m%s\x1b[0m: ','DIFF DIAS:'+diff_dias);
                        //console.log('\x1b[33m%s\x1b[0m: ','FECHA:'+fecha);
                        fecha = (moment(fecha).add(1, 'y')).format("YYYY-MM-DD");

                        diff_dias = moment(fecha_actual).startOf('day').hour(12).diff(fecha, 'days');
                        //console.log('\x1b[33m%s\x1b[0m: ','FUERA: '+ moment(fecha).format('DD-MM-YYYY'));
                        if(diff_dias == 0){
                            console.log('agregar vacacion');
                            id_empleados.push({ 'id_empleado': empleado.id,'dias':dias_vacacion, 'fecha_actual':fecha_actual });                     
                        }
                    }
                    
                }

            }
            return id_empleados
        }).then(id_empleados =>{
            console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(id_empleados));
            for(let empleado of id_empleados){
                //console.log('\x1b[33m%s\x1b[0m: ',empleado);
                modelos.Saldo_Vacacion.findOne({
                    where: {
                        id_empleado: empleado.id_empleado,
                        prescrito_estado: false,
                        gestion: moment().format('YYYY')
                    },
                    order: [['gestion','ASC']]
                }).then((saldo) => {
                    if( saldo == null ){
                        console.log('\x1b[33m%s\x1b[0m: ','Crear Saldo');
                        var saldo_fecha_inicio = moment(empleado.fecha_actual).tz('America/La_Paz').add(1, 'hour').format('YYYY-MM-DD HH:mm');
                        var saldo_fecha_fin = moment(saldo_fecha_inicio, "YYYY-MM-DD HH:mm").tz('America/La_Paz').add('years',1);
                        var gestion = moment().format('YYYY');

                        var nuevo_saldo = { fecha_inicio: saldo_fecha_inicio, fecha_fin: saldo_fecha_fin, dias: empleado.dias, prescrito_estado: false, gestion: gestion, observacion: '', id_empleado: empleado.id_empleado }
                        console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(nuevo_saldo));

                        modelos.Saldo_Vacacion.create(
                            nuevo_saldo
                        ).then(new_saldo_vacacion => {
                            //res.json(new_saldo_vacacion);
                        })
                    }else{
                        //console.log('\x1b[33m%s\x1b[0m: ','Saldo Vacacion');
                        //console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(saldo));                   
                    }
                });

            }
            res.json({mensaje: 'ejecutado correctamente'}); 
        })
    
});

module.exports = router;