var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var request = require('request');
var http= require("http");
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');
var param = require('../../config/param.json');


router.post('/marcaciones', function(req,res2, next) {
  var ip=req.body.dispositivo;
  var puerto= "4370";
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      let data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end',()=>{
        var x = JSON.parse(data);
        modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
          res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
        })
      })
    }).end();
})




router.get('/dispositivos',md_auth.ensureAuth, function(req,res, next) {
  modelos.Dispositivo.findAll({
  }).then(newdispositivos => {
    // projects will be an array of Project instances with the specified name
    res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
  })
})


router.post('/registro_dispositivo',md_auth.ensureAuth, (req, res) => {
  const DireccionIP = req.body.ip;
  const Puerto = req.body.puerto;
  const Cod_Estado = req.body.estado;
  const Modelo = req.body.modelo;
  const Identificador = req.body.identificador;
  const Comentario = req.body.comentario;
  modelos.Dispositivo.create({
    DireccionIP: DireccionIP,
    Puerto: Puerto,
    Cod_Estado: Cod_Estado,
    Modelo: Modelo,
    Identificador: Identificador,
    Comentario: Comentario,
  })
    .then(newdispositivocreado => {
      modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
        // projects will be an array of Project instances with the specified name
        res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
      })
      //res.render('/identificacion_personal2',{ci:ci});
      //res.json(newempleado);
    })
});

router.post('/elimina_dispositivo',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id
  modelos.Dispositivo.destroy({  
    where: { id: id }
  })
  .then(deletedispositivo => {
    modelos.Dispositivo.findAll({
    }).then(newdispositivos => {
      // projects will be an array of Project instances with the specified name
      res.render('marcacion/dispositivos',{newdispositivo:newdispositivos});
    })
  });
});


router.get('/marcacion',md_auth.ensureAuth, function(req,res, next) {
  modelos.Dispositivo.findAll({
  }).then(newdispositivos => {
    var x = new Array();
    res.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,moment:moment});
  })
})



router.post('/guardar_marcacion', function(req,res2, next) {
  var ip=req.body.ip;
  var puerto= "4370";
  var array1=new Array();
  ip=ip.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
  /*var ips="192.168.130.33";
  console.log(ip);*/
    var options = {
      host: param.webservice_marcacion.ip,
      port: param.webservice_marcacion.puerto,
      path: '/usr2?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var x = JSON.parse(chunk);
        var array2=new Array();
        for(var j=0;j<x.length;j++){
          if(j!=x.length-1){
            modelos.BS.create({
              UserID:x[j][1],
              eventTime:x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][1],
              IP:ip,
              bandera:0,
              }).then()
          }else{
            modelos.BS.create({
              UserID:x[j][1],
              eventTime:x[j][3],
              tnaEvent:x[j][2],
              Code:x[j][1],
              IP:ip,
              bandera:0,
              }).then(newbs=>{
                modelos.Dispositivo.findAll({
                }).then(newdispositivos => {
                  res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
                })
            })}
      }
    })
  }).end();
  })



  var marcaciones=function(req,res, next) {
    modelos.Empleado.findAll({}).then(newempleado=>{
      modelos.BS.findAll({where:{bandera:'0'}}).then(newbs=>{
        req.newempleado=newempleado;
        req.newbs=newbs;
        next()
      })
    });
  }
router.use(marcaciones);
  router.get('/guardar_asistencia', function(req,res, next) {
    console.log(req.query.fecha);

    var entrada_1;
    var salida_1;
    var entrada_2;
    var salida_2;
    var id_empleado;
    var id_horario;
    var fecha=req.query.fecha;
    var fec;
    var sw=0;
    var x1=moment().format(fecha+" 00:00:00");
    console.log("Hora ------------------>"+x1);
    var x2=moment().format(fecha+" 12:29:00");
    console.log("Hora ------------------>"+x2);
    var x3=moment().format(fecha+" 12:30:00");
    console.log("Hora ------------------>"+x3);
    var x4=moment().format(fecha+" 13:29:00");
    console.log("Hora ------------------>"+x4);
    var x5=moment().format(fecha+" 13:30:00");
    console.log("Hora ------------------>"+x5);
    var x6=moment().format(fecha+" 18:29:00");
    console.log("Hora ------------------>"+x6);
    var x7=moment().format(fecha+" 18:30:00");
    console.log("Hora ------------------>"+x7);
    var x8=moment().format(fecha+" 23:59:00");
    console.log("Hora ------------------>"+x8);
    
      for(i=0;i<req.newempleado.length;i++){
        sw=0;
          for(var j=0;j<req.newbs.length;j++){
            fec=moment(req.newbs[j].eventTime).format("YYYY-MM-DD HH:mm:ss");
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x1,x2,null,'[]')){
              entrada_1=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x3,x4,null,'[]')){
              salida_1=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x5,x6,null,'[]')){
              entrada_2=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
            if(req.newempleado[i].ndi==req.newbs[j].Code && moment(fec).isBetween(x7,x8,null,'[]')){
              salida_2=moment(req.newbs[j].eventTime).format("HH:mm:ss");
              sw=1;
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:req.newbs[j].id}})
              .then({});
            }
          }//end for j
          if(sw==1){
            sw=0;
            var date=moment().format(fecha+" 00:00:00");
          modelos.Asistencia.create({
              fecha:date,
              entrada_1:entrada_1,
              salida_1,salida_1,
              entrada_2:entrada_2,
              salida_2:salida_2,
              id_empleado:req.newempleado[i].id,
          }).then();
        }
      }//end for i
      res.json({fecha:{fecha}});    
  })//inicio



  var datos=function(req,res, next) {
    modelos.Asistencia.findAll({where:{id_horario:null}}).then(newasistencias=>{
      modelos.Horario_especial.findAll({}).then(newhorarioesp=>{
        modelos.Horario.findAll({}).then(newhorario=>{
          modelos.Empleado.findAll({}).then(newempleado=>{
            req.newasistencia=newasistencias;
            req.newhorarioesp=newhorarioesp;
            req.newhorario=newhorario;
            req.newempleado=newempleado;
            next();
            //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
          })
        })
      })
    });
  }
router.use(datos);
  router.get('/proceso_datos', function(req,res, next) {
    var idhorario;
    var sw;
    var cont1;
    var cont2;
    for(var i=0;i<req.newasistencia.length;i++){
      idhorario=0;
      sw=0;
      cont1=0;
      cont2=0;
      if(req.newasistencia[i].id_horario==null){
      while(sw==0 && cont1!=req.newhorarioesp.length){
        if(req.newasistencia[i].id_empleado==req.newhorarioesp[cont1].id_empleado && req.newasistencia[i].fecha==req.newhorarioesp[cont1].fecha){
          idhorario=req.newhorarioesp[cont1].id_horario;
          sw=1;
        }else{
          cont1=cont1+1;
        }
      }
      if(sw==0){
        while(sw==0 && cont2!=req.newempleado.length){
          if(req.newasistencia[i].id_empleado==req.newempleado[cont2].id){
            idhorario=req.newempleado[cont2].id_horario;
            sw=1;
          }else{
            cont2=cont2+1;
          }
        } 
      }
      }
      if(sw==1){
        const asist_modificado = {
          id_horario:idhorario,
        }
        modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then(modificados=>{
        });
      }
    }
  })


  var horarios=function(req,res, next) {
    modelos.Asistencia.findAll({where:{retraso_entrada_1:null,retraso_salida_1:null,retraso_entrada_2:null,retraso_salida_2:null}}).then(newasistencias=>{
        modelos.Horario.findAll({}).then(newhorario=>{
            req.newasistencia=newasistencias;
            req.newhorario=newhorario;
            next();
            //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
        })
    });
  }
router.use(horarios);
router.get('/calculo_datos', function(req,res, next) {
  var retraso_entrada_1;
  var retraso_salida_1;
  var retraso_entrada_2;
  var retraso_salida_2;
  var observacion_entrada_1;
  var observacion_salida_1;
  var observacion_entrada_2;
  var observacion_salida_2;
  var sw=0;
  var cont=0;
  for(var i=0;i<req.newasistencia.length;i++){
    while(sw==0 || cont<req.newhorario.lenght){
      if(req.newasistencia[i].id_horario==req.newhorario[cont].id){
        var calcent1=moment().format("YYYY-MM-DD "+req.newhorario[cont].entrada_1);
        var calcent1=moment(calcent1).add(req.newhorario[cont].tolerancia_entrada_1,"minutes").format('HH:mm');
        var calcent2=moment().format("YYYY-MM-DD "+req.newhorario[cont].entrada_2);
        var calcent2=moment(calcent2).add(req.newhorario[cont].tolerancia_entrada_1,"minutes").format('HH:mm');
        var calc1=0;
        var calc2=0;
        var calc3=0;
        var calc4=0;
        observacion_entrada_1=null,
        observacion_entrada_2=null,
        observacion_salida_1=null,
        observacion_salida_2=null,
        console.log("registros-->"+calcent1+"->>"+calcent2);
        if(req.newasistencia[i].entrada_1>calcent1){
          var tiempo_inicio=moment(req.newasistencia[i].entrada_1,'HH:mm');
          var tiempo_fin=moment(calcent1,'HH:mm');
          //calcent1=(moment().format("YYYY-MM-DD "+req.newasistencia[i].entrada_1)) - (moment().format("YYYY-MM-DD "+calcent1));
          calc1=(moment.duration(tiempo_inicio - tiempo_fin))/3600000;
          calc1=calc1*60;
          console.log("atraso primera entrada->"+calcent1+"otra hora--->"+req.newasistencia[i].entrada_1+"->"+calc1);
        }
        if(req.newasistencia[i].entrada_2>calcent2){
          var tiempo_inicio=moment(req.newasistencia[i].entrada_2,'HH:mm');
          var tiempo_fin=moment(calcent2,'HH:mm');
          //calcent1=(moment().format("YYYY-MM-DD "+req.newasistencia[i].entrada_2)) - (moment().format("YYYY-MM-DD "+calcent2));
          calc2=(moment.duration(tiempo_inicio - tiempo_fin))/3600000;
          calc2=calc2*60;
          console.log("atraso segunda entrada->"+calcent2+"otra hora--->"+req.newasistencia[i].entrada_2+"->"+calc2);
        }
        if(req.newasistencia[i].entrada_1==null){
          calc1=null;
          observacion_entrada_1="ABANDONO";
        }
        if(req.newasistencia[i].entrada_2==null){
          calc2=null;
          observacion_entrada_2="ABANDONO";
        }
        if(req.newasistencia[i].salida_1==null){
          calc3=null;
          observacion_salida_1="ABANDONO";
        }
        if(req.newasistencia[i].salida_2==null){
          calc4=null;
          observacion_salida_2="ABANDONO";
        }
        const asist_modificado = {
          retraso_entrada_1:calc1,
          retraso_entrada_2:calc2,
          retraso_salida_1:calc3,
          retraso_salida_2:calc4,
          observacion_entrada_1:observacion_entrada_1,
          observacion_entrada_2:observacion_entrada_2,
          observacion_salida_1:observacion_salida_1,
          observacion_salida_2:observacion_salida_2,
        }
        modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then({})
        sw=1;
        }else{
        cont=cont+1;
        }
    }
    cont=0;
    sw=0;
  }
})



var boletas=function(req,res, next) {
  modelos.Boleta.findAll({}).then(newboletas=>{
      modelos.Tipo_boleta.findAll({}).then(newtipo_boleta=>{
        modelos.Asistencia.findAll({}).then(newasistencia=>{
          req.newasistencia=newasistencia;
          req.newboletas=newboletas;
          req.newtipo_boleta=newtipo_boleta;
          next();
          //res.send("./routes/marcacion/marcacion/proceso_datos",{newasistencias:newasistencias,newhorarioesp:newhorarioesp,newhorario:newhorario,newempleado:newempleado});
      })
  })
})
}
router.use(boletas);
router.get('/calculo_boletas', function(req,res, next) {
/*var fechaini=req.query.fechaini;
var fechafin=req.query.fechafin;
var id_empleado=req.query.id_empleado;*/
var fechaini=moment("2017-12-20", "YYYY-MM-DD");
var fechafin=moment("2017-12-20", "YYYY-MM-DD");
fechaini=fechaini.format("YYYY-MM-DD");
fechafin=fechafin.format("YYYY-MM-DD");
/*console.log(fechaini);
console.log(fechafin);*/
var id_empleado="6036979";
for(var i=0;i<req.newasistencia.length;i++){
  var x=moment(req.newasistencia[i].fecha).format("YYYY-MM-DD");
    if (moment(x).isBetween(fechaini, fechafin,'days', '[]') && id_empleado==req.newasistencia[i].id_empleado) {
      for(var j=0;j<req.newboletas.length;j++){
        var fec_ini_boleta=moment(req.newboletas[j].fecha_inicio).format("YYYY-MM-DD");
        var fec_fin_boleta=moment(req.newboletas[j].fecha_fin).format("YYYY-MM-DD");
        var n=moment(req.newboletas[j].fecha_inicio).format("HH:mm:ss")
        if (moment(x).isBetween(fec_ini_boleta, fec_fin_boleta,'days', '[]') && id_empleado==req.newasistencia[i].id_empleado) {
          for(var k=0;k<req.newtipo_boleta.length;k++){
            if(req.newboletas[j].id_tipo_boleta==req.newtipo_boleta[k].id){
              var observacion_entrada_1=req.newtipo_boleta[k].Tipo_boleta;
              var observacion_entrada_2=req.newtipo_boleta[k].Tipo_boleta;
              var observacion_salida_1=req.newtipo_boleta[k].Tipo_boleta;
               var observacion_salida_2=req.newtipo_boleta[k].Tipo_boleta;
               if(req.newboletas[j]){}
              const asist_modificado = {
                observacion_entrada_1:observacion_entrada_1,
                observacion_entrada_2:observacion_entrada_2,
                observacion_salida_1:observacion_salida_1,
                observacion_salida_2:observacion_salida_2,
              }
              modelos.Asistencia.update(asist_modificado, {where: { id:req.newasistencia[i].id }}).then({})              
            }
          }
        }
      }
    }else {
        console.log('is not between')
      }
}
//res.render();
})

module.exports = router;
