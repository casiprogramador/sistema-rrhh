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
      host: "localhost",
      port: 8080,
      path: '/usr?'+"ip="+ip+"&puerto="+puerto,
      method: 'GET'
    }
    http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var x = JSON.parse(chunk);
        modelos.Dispositivo.findAll({
        }).then(newdispositivos => {
          res2.render('marcacion/marcacion',{newdispositivo:newdispositivos,x:x,ip:ip,moment:moment});
        })
      });
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
      host: "localhost",
      port: 8080,
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


  router.get('/guardar_asistencia', function(req,res, next) {
    var entrada_1;
    var salida_1;
    var entrada_2;
    var salida_2;
    var id_empleado;
    var id_horario;
    var fecha="2017-12-19";
    var fec;
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
    modelos.Empleado.findAll({}).then(newempleado=>{
      for(i=0;i<newempleado.length;i++){
        modelos.BS.findAll({
          where:{UserID:newempleado[i].ndi}
        }).then(newbs=>{
          if(newbs.length>0){
            var ci=newbs[0].UserID;
            //var ci=newempleado[i].id;
          for(var j=0;j<newbs.length;j++){
            //console.log("ndi hallados en bs"+newbs[j].UserID);
            fec=moment(newbs[j].eventTime).format("YYYY-MM-DD HH:mm:ss");
            //console.log("Hora-->"+fec);
            if(moment(fec).isBetween(x1,x2,null,'[]')){
              //entrada_1=moment(newbs[j].eventTime).format("HH:mm")
              entrada_1=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x3,x4,null,'[]')){
              //moment(salida_1=newbs[j].eventTime).format("HH:mm")
              salida_1=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x5,x6,null,'[]')){
              //moment(entrada_2=newbs[j].eventTime).format("HH:mm")
              entrada_2=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
            if(moment(fec).isBetween(x7,x8,null,'[]')){
              //moment(salida_2=newbs[j].eventTime).format("HH:mm")
              salida_2=moment(newbs[j].eventTime).format("HH:mm:ss");
              const bsnew={bandera:1};
              modelos.BS.update(bsnew,{where:{id:newbs[j].id}})
              .then({});
            }
          }//end for j
          modelos.Asistencia.create({
              fecha:fecha,
              entrada_1:entrada_1,
              salida_1,salida_1,
              entrada_2:entrada_2,
              salida_2:salida_2,
              id_empleado:ci,
          }).then();
        }
        else{console.log("sin marcaciones");}
        })//fin newbs
      }//end for i
      res.render("/home");
    });
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
          if(req.newasistencia[i].id_empleado==req.newempleado[cont2].ndi){
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

module.exports = router;


/*if(req.newasistencia[i].id_empleado==req.newhorarioesp[j].id_empleado && req.newasistencia[i].fecha==req.newhorarioesp[j].fecha){
  console.log("existe horario especial");
  idhorario=req.newhorarioesp[j].id_horario;
}else{
  for(var j=0;j<req.newempleado.length;j++){
    if(req.newasistencia[i].id_empleado==req.newempleado[j].id_empleado){
      idhorario=req.newempleado[j].id_horario;
    }
  }
}*/