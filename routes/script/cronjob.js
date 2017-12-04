var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

//Consulta de empleados por area
router.get('/calcularvacacion', function(req, res, next) {
    modelos.sequelize.query('SELECT public."Empleados".id,public."Historico_Cas".id as id_cas, public."Contratos".fecha_inicio, public."Historico_Cas".aa, public."Historico_Cas".mm, public."Historico_Cas".dd FROM public."Empleados" INNER JOIN  public."Contratos" ON public."Contratos".id_empleado = public."Empleados".id LEFT JOIN  public."Historico_Cas" ON public."Historico_Cas".id_empleado = public."Empleados".id WHERE public."Empleados".estado = true and public."Contratos".estado = true').spread((empleados, metadata) => {
        console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(empleados));
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

                modelos.Saldo_Vacacion.findOne({
                    where: {
                        id_empleado: empleado.id,
                        prescrito_estado: false
                    },
                    order: [['gestion','ASC']]
                }).then(saldo => {
                    if( saldo == null ){
                        var saldo_fecha_inicio = empleado.fecha_inicio;
                        var saldo_fecha_fin = moment(empleado.fecha_inicio, "YYYY-MM-DD").add('years',1);
                        var gestion = moment(saldo_fecha_fin).format('YYYY');

                        console.log('\x1b[33m%s\x1b[0m: ',saldo_fecha_inicio);
                        console.log('\x1b[33m%s\x1b[0m: ',saldo_fecha_fin);
                        console.log('\x1b[33m%s\x1b[0m: ',gestion);

                        var nuevo_saldo = { fecha_inicio: saldo_fecha_inicio, fecha_fin: saldo_fecha_fin, dias: dias_vacacion, prescrito_estado: false, gestion: gestion, observacion: '', id_empleado: empleado.id }
                        
                        modelos.Saldo_Vacacion.create(
                            nuevo_saldo
                        ).then(new_saldo_vacacion => {
                            //res.json(new_saldo_vacacion);
                        })
                    }else{
                        //console.log('\x1b[33m%s\x1b[0m: ','Existe registro'+empleado.id);

                    }
                });
                /*
                
                */
            }

            /*
            var fecha_inicio = empleado.fecha_inicio;
            console.log('\x1b[33m%s\x1b[0m: ','INICIO: '+ moment(fecha_inicio).format('DD/MM/YYYY')); 
            if(empleado.dd != null){
                fecha_inicio = moment(fecha_inicio).subtract(empleado.aa, "years");
            }
            if(empleado.mm != null){
                fecha_inicio = moment(fecha_inicio).subtract(empleado.mm, "months");
            }
            if(empleado.aa != null){
                fecha_inicio = moment(fecha_inicio).subtract(empleado.dd , "days");
            }
            console.log('\x1b[33m%s\x1b[0m: ',empleado.id);
            var antiguedad = moment().diff(fecha_inicio, 'years');
            console.log('\x1b[33m%s\x1b[0m: ',antiguedad);
            console.log('\x1b[33m%s\x1b[0m: ', moment(fecha_inicio).format('DD/MM/YYYY')); 
            
            fecha_fin_vacacion = moment(empleado.fecha_inicio, "DD-MM-YYYY").add('years', 1);
            */
        }
        res.json(empleados);
    })
});

module.exports = router;