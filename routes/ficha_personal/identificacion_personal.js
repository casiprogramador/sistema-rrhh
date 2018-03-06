var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var md_auth = require('../../middleware/authenticated');


/* Ruta a la ficha 0. */
router.get('/identificacion_personal0',md_auth.ensureAuth, function(req, res, next) {
  res.render('ficha_personal/ficha0');
});


// ruta a la ficha 1, pregunta si existe o no para su visualizacion
router.get('/identificacion_personal',md_auth.ensureAuth, function(req, res, next) {
  modelos.Empleado.findAll({ 
    where: { id: res.locals.user.empleado.id } }).then(newempleado =>{ 
            var x=null;
            var y=null;
              if(newempleado[0].sexo=='M'){
                x="checked";
              }
              else{
                  y="checked";
              }
            res.render('ficha_personal/ficha1',{newempleado:newempleado,moment:moment,x:x,y:y});
          })
})


// Ruta a la ficha 3, dependientes

router.get('/identificacion_personal3',md_auth.ensureAuth, function(req, res, next) {
  modelos.Dependiente.findAll({ 
    attributes: ['id','paterno', 'materno','nombres','desc_otro'],
    // añadir id
    where: { id_empleado: res.locals.user.empleado.id } }).then(dependientes => {
      console.log(JSON.stringify(dependientes));
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha3',{dependientes:dependientes});
  })
});

// Ruta a la ficha 4 experiencia laboral

router.get('/identificacion_personal4',md_auth.ensureAuth, function(req, res, next) {
  modelos.Experiencia.findAll({ 
    attributes: ['id','nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
    // añadir id
    where: { id_empleado: res.locals.user.empleado.id } }).then(experiencia => {
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha4',{experiencia:experiencia, moment:moment});
  })
});

// Ruta a la ficha 5, referencias personales y referencias de trabajo

router.get('/identificacion_personal5',md_auth.ensureAuth, function(req, res, next) {
  modelos.Referencias_Personales.findAll({ 
    attributes: ['id','nombre', 'relacion','telefono'],
    where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_personales => {
    modelos.Referencias_Trabajo.findAll({ 
      attributes: ['id','nombre', 'institucion','telefono'],
      where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_trabajo => {
      res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
    })
  })
});


//res.render('ficha_personal/ficha2',{Idioma:Idioma,id:newempleado.id});


// Registro de datos adicionales del empleado
router.post('/identificacion_personal2',md_auth.ensureAuth, (req, res) => {
    // actualizacion tabla empleado
    const nit = req.body.nit;
    const afp = req.body.afp;
    const seguro_medico = req.body.seguro_medico;
    const nro_seguro = req.body.nro_seguro;
    const tipo_seguro = req.body.tipo_seguro;
    const nua = req.body.nua;
    const ren = req.body.ren;
    const anios_calificados = req.body.anios_calificados;
    const nro_declar_jurada = req.body.nro_declar_jurada;
    const nro_cuenta = req.body.nro_cuenta;
    const banco = req.body.banco;
    const tipo_cuenta = req.body.tipo_cuenta;
    //tabla estudios
    const nivel = req.body.nivel;
    const especificacion = req.body.especificacion;
    const titulo = req.body.titulo;
    const carrera = req.body.carrera;
    const institucion = req.body.institucion;
    const concluida = req.body.concluida;
    const ciudad = req.body.ciudad;
    const pais = req.body.pais;
    const anios_vencidos = req.body.anios_vencidos;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;
    const colegio_prof = req.body.col_profesional;
    const nro_registro_prof = req.body.nro_registro_pro;
    // tabla idiomas
    const lecturaesp =req.body.lecturaesp;
    const escrituraesp =req.body.escrituraesp;
    const hablaesp =req.body.hablaesp;
    const lecturaing =req.body.lecturaing;
    const escrituraing =req.body.escrituraing;
    const hablaing =req.body.hablaing;
    const otro =req.body.otro;
    const lecturaotro =req.body.lecturaotro;
    const escrituraotro =req.body.escrituraotro;
    const hablaotro =req.body.hablaotro;
    
    //actualizacion de empleado
    const newempleado = {  
      nit: nit,
      afp: afp,
      seguro_medico: seguro_medico,
      nro_seguro: nro_seguro,
      tipo_seguro: tipo_seguro,
      nua: nua,
      ren: ren,
      anios_calificados: anios_calificados,
      nro_declar_jurada: nro_declar_jurada,
      nro_cuenta: nro_cuenta,
      banco: banco,
      tipo_cuenta: tipo_cuenta
    };
    //console.log(nua,ren);
    modelos.Empleado.update(newempleado, {where: { id: res.locals.user.empleado.id }})  
          .then(updatedMax => {
            const newestudios={
              nivel:nivel,
              especificacion:especificacion,
              titulo:titulo,
              carrera:carrera,
              institucion:institucion,
              concluida:concluida,
              ciudad:ciudad,
              pais:pais,
              anios_vencidos:anios_vencidos,
              fecha_inicio:fecha_inicio,
              fecha_fin:fecha_fin,
              colegio_prof:colegio_prof,
              nro_registro_prof:nro_registro_prof
            };
            modelos.Estudios.update(newestudios,{where:{id_empleado:res.locals.user.empleado.id}})
            .then(updatedMax=>{
              const newidioma1={
                lee:lecturaesp,
                escribe:escrituraesp,
                habla:hablaesp,
              };
              modelos.Empleado_Idioma.update(newidioma1,{where:{id_empleado:res.locals.user.empleado.id,id_idioma:1}})
              .then(updatedMax=>{
                const newidioma2={
                  lee:lecturaing,
                  escribe:escrituraing,
                  habla:hablaing,
                };
                modelos.Empleado_Idioma.update(newidioma2,{where:{id_empleado:res.locals.user.empleado.id,id_idioma:2}})
                .then(updatedMax=>{
                  const newidioma3={
                    lee:lecturaotro,
                    escribe:escrituraotro,
                    habla:hablaotro,
                    id_idioma:otro
                  }
                  modelos.Empleado_Idioma.update(newidioma3,{where:{id_empleado:res.locals.user.empleado.id,id_idioma:otro}})
                  .then(updatedMax=>{
                    res.redirect('/home');
                  })
                })
              })
            })
            })
    })

//registro de Dependientes

router.post('/identificacion_personal3',md_auth.ensureAuth, (req, res) => {
  const paterno = req.body.paterno;
  const materno = req.body.materno;
  const nombres = req.body.nombres;
  const fecha_nacimiento = req.body.fecha_nacimiento;
  const sexo = req.body.sexo;
  const expedido = req.body.expedido;
  const ndi = req.body.ndi;
  const tipo_documento= req.body.tipo_documento;
  const desc_otro = req.body.desc_otro;
  const num_doc_depen = req.body.num_doc_depen;
  const id_empleado = req.body.id_empleado;
  modelos.Dependiente.create({
    ndi: ndi,
    expedido: expedido,
    paterno: paterno,
    materno: materno,
    nombres: nombres,
    fecha_nacimiento: fecha_nacimiento,
    sexo: sexo,
    tipo_documento: tipo_documento,
    desc_otro: desc_otro,
    num_doc_depen: num_doc_depen,
    id_empleado: id_empleado
  })
    .then(newdependiente => {
      modelos.Dependiente.findAll({ 
        attributes: ['id','paterno', 'materno','nombres','desc_otro'],
        // añadir id
        where: { id_empleado: res.locals.user.empleado.id } }).then(dependientes => {
        // projects will be an array of Project instances with the specified name
        res.render('ficha_personal/ficha3',{dependientes:dependientes});
      })
      //res.render('/identificacion_personal2',{ci:ci});
      //res.json(newempleado);
    })
});


// Registro de experiencia
router.post('/identificacion_personal4',md_auth.ensureAuth, (req, res) => {
    const nombre_empresa = req.body.nombre_empresa;
    const tipo_empresa = req.body.tipo_empresa;
    const cargo = req.body.cargo;
    const pais = req.body.pais;
    const ciudad = req.body.ciudad;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;
    const id_empleado = req.body.id_empleado;
    modelos.Experiencia.create({
      nombre_empresa: nombre_empresa,
      tipo_empresa: tipo_empresa,
      cargo: cargo,
      pais: pais,
      ciudad: ciudad,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      id_empleado: id_empleado
    })
      .then(newexperiencia => {
        modelos.Experiencia.findAll({ 
          attributes: ['id','nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
          // añadir id
          where: { id_empleado: res.locals.user.empleado.id } }).then(experiencia => {
          // projects will be an array of Project instances with the specified name
          res.redirect('/ficha_personal/identificacion_personal4');
        })
      })
});


//registro de referencias personales

router.post('/identificacion_personal5',md_auth.ensureAuth, (req, res) => {
  const nombrep = req.body.nombrep;
  const relacion = req.body.relacion;
  const telefonop = req.body.telefonop;
  const id_empleado = req.body.id_empleado;
  modelos.Referencias_Personales.create({
    nombre: nombrep,
    relacion: relacion,
    telefono: telefonop,
    id_empleado: id_empleado
  })
    .then(newreferencias_personales => {
      modelos.Referencias_Personales.findAll({ 
        attributes: ['id','nombre', 'relacion','telefono'],
        // añadir id
        where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_personales => {
        // projects will be an array of Project instances with the specified name
        modelos.Referencias_Trabajo.findAll({ 
          attributes: ['id','nombre', 'institucion','telefono'],
          // añadir id
          where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_trabajo => {
          // projects will be an array of Project instances with the specified name
          res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
        })
      })
      })
});

//Registro de referencias de trabajo

router.post('/identificacion_personal6',md_auth.ensureAuth, (req, res) => {
  const nombrei = req.body.nombrei;
  const institucion = req.body.institucion;
  const telefonoi = req.body.telefonoi;
  const id_empleado = req.body.id_empleado;
  modelos.Referencias_Trabajo.create({
    nombre: nombrei,
    institucion: institucion,
    telefono: telefonoi,
    id_empleado: id_empleado
  })
    .then(referencias_trabajo => {
      modelos.Referencias_Personales.findAll({ 
        attributes: ['id','nombre', 'relacion','telefono'],
        // añadir id
        where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_personales => {
        // projects will be an array of Project instances with the specified name
        modelos.Referencias_Trabajo.findAll({ 
          attributes: ['id','nombre', 'institucion','telefono'],
          // añadir id
          where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_trabajo => {
          // projects will be an array of Project instances with the specified name
          res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
        })
      })
      })
    })


//Eliminacon de dependientes
router.post('/elimina_dependiente',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id_dependiente
  modelos.Dependiente.destroy({  
    where: { id: id }
  })
  .then(deletdependiente => {
    modelos.Dependiente.findAll({ 
      attributes: ['id','paterno', 'materno','nombres','desc_otro'],
      // añadir id
      where: { id_empleado: res.locals.user.empleado.id } }).then(dependientes => {
      // projects will be an array of Project instances with the specified name
      res.render('ficha_personal/ficha3',{dependientes:dependientes}); 
    })
  });
});

router.post('/elimina_experiencia',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id_experiencia
  modelos.Experiencia.destroy({  
    where: { id: id }
  })
  .then(deletexperiencia => {
    modelos.Experiencia.findAll({ 
      attributes: ['id','nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
      // añadir id
      where: { id_empleado: res.locals.user.empleado.id } }).then(newexperiencia => {
      // projects will be an array of Project instances with the specified name
      res.redirect('/ficha_personal/identificacion_personal4');
    })
  });
});

router.post('/elimina_referencia_personal',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id_referencia_personal
  modelos.Referencias_Personales.destroy({  
    where: { id: id }
  })
  .then(deletereferenciap => {
    modelos.Referencias_Personales.findAll({ 
      attributes: ['id','nombre', 'relacion','telefono'],
      where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_personales => {
      modelos.Referencias_Trabajo.findAll({ 
        attributes: ['id','nombre', 'institucion','telefono'],
        where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_trabajo => {
        res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
  });
});
})
})

router.post('/elimina_referencias_trabajo',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id_referencias_trabajo
  modelos.Referencias_Trabajo.destroy({  
    where: { id: id }
  })
  .then(deletereferenciat => {
    modelos.Referencias_Personales.findAll({ 
      attributes: ['id','nombre', 'relacion','telefono'],
      where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_personales => {
      modelos.Referencias_Trabajo.findAll({ 
        attributes: ['id','nombre', 'institucion','telefono'],
        where: { id_empleado: res.locals.user.empleado.id } }).then(referencias_trabajo => {
        res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
  });
});
})
})

/*router.get('/ficha_personal', function(req, res, next) {
  res.render('ficha_personal/ficha_personal');
});*/

// Reporte de la ficha Personal

router.get('/ficha_personal',md_auth.ensureAuth, (req, res) => {
  const nombrei = req.body.nombrei;
      modelos.Empleado.findAll({
        where: { id: res.locals.user.empleado.id } }).then(newempleado => {
        // projects will be an array of Project instances with the specified name
        modelos.Estudios.findAll({ 
          where: { id_empleado: res.locals.user.empleado.id } }).then(newestudios => {
          // projects will be an array of Project instances with the specified name
          modelos.Empleado_Idioma.findAll({ 
            where: { id_empleado: res.locals.user.empleado.id } }).then(newempleado_idioma => {
            // projects will be an array of Project instances with the specified name
            modelos.Dependiente.findAll({ 
              where: { id_empleado: res.locals.user.empleado.id } }).then(newdependiente => {
              // projects will be an array of Project instances with the specified name
              modelos.Experiencia.findAll({ 
                where: { id_empleado: res.locals.user.empleado.id } }).then(newexperiencia => {
                // projects will be an array of Project instances with the specified name
                modelos.Referencias_Personales.findAll({ 
                  where: { id_empleado: res.locals.user.empleado.id } }).then(newreferencias_personales => {
                  // projects will be an array of Project instances with the specified name
                  modelos.Referencias_Trabajo.findAll({ 
                    where: { id_empleado: res.locals.user.empleado.id } }).then(newreferencias_trabajo => {
                    // projects will be an array of Project instances with the specified name
                    //console.log({newempleado:newempleado,newestudios:newestudios,newempleado_idioma:newempleado_idioma,newdependiente:newdependiente,newexperiencia:newexperiencia,newreferencias_personales:newreferencias_personales,newreferencias_trabajo:newreferencias_trabajo});
                    res.render('ficha_personal/ficha_personal',{newempleado:newempleado,newestudios:newestudios,newempleado_idioma:newempleado_idioma,newdependiente:newdependiente,newexperiencia:newexperiencia,newreferencias_personales:newreferencias_personales,newreferencias_trabajo:newreferencias_trabajo,moment:moment});
                  })
                })
              })
            })
          })
        })
      })
    })


    //actualizaciones de Ficha 1

    router.post('/identificacion_personal_update',md_auth.ensureAuth, (req, res) => {
      const nombres = req.body.nombre;
      const priapellido = req.body.priapellido;
      const segapellido = req.body.segapellido;
      const casapellido = req.body.casapellido;
      const ci = req.body.ci;
      const expedido = req.body.expedido;
      const paisci = req.body.paisci;
      const provincia = req.body.provincia;
      const departamento = req.body.departamento;
      const paisnac = req.body.paisnac;
      const nacionalidad = req.body.nacionalidad;
      var fecnac = new Date();
      fecnac = req.body.fecnac;
      const sexo = req.body.sexo;
      const sangre = req.body.sangre;
      const ecivil = req.body.ecivil;
      const lmilitar = req.body.lmilitar;
      const calle = req.body.calle;
      const num = req.body.num;
      const nedificio = req.body.nedificio;
      const piso = req.body.piso;
      const depto = req.body.depto;
      const zona = req.body.zona;
      const tdomicilio = req.body.tdomicilio;
      const tcelular = req.body.tcelular;
      const casilla = req.body.casilla;
      const emailp = req.body.emailp;
      const emailt = req.body.emailt;

      const nivel = "Nivel";
      const especificacion = "Especificacion";
      const titulo = "Titulo";
      const carrera = "Carrera";
      const institucion = "Institucion";
      const concluida = true;
      const ciudad = "ciudad";
      const pais = "Pais";
      const anios_vencidos = "0";
      const fecha_inicio = Date.now();
      const fecha_fin = Date.now();
      const colegio_prof = "Colegio Profesional";
      const nro_registro_prof = "0";
      // tabla idiomas
      const lecturaesp ="0";
      const escrituraesp ="0";
      const hablaesp ="0";
      const lecturaing ="0";
      const escrituraing ="0";
      const hablaing ="0";
      const otro ="Otro";
      const lecturaotro ="0";
      const escrituraotro ="0";
      const hablaotro ="0";
      const id_idioma=req.body.otro;
    
        /*var path = req.files.foto.path;
        var fs =require('fs');
        var newPath = req.files.foto.name;
        var is = fs.createReadStream(path);
        var os = fs.createWriteStream(newPath);
        is.pipe(os);
        is.on('end', function() {
          //eliminamos el archivo temporal
          fs.unlinkSync(path)
       })
        is.pipe(os)*/
        var fs =require('fs');
        console.log('\x1b[33m%s\x1b[0m',JSON.stringify(req.files.foto.originalFilename));
        var tmp_path = req.files.foto.path;
        // Ruta donde colocaremos las imagenes
        var target_path = "public/fotos/"+ci+".jpeg";
        var pathbd="/fotos/"+ci+".jpeg";
       // Comprobamos que el fichero es de tipo imagen
        if (req.files.foto.type.indexOf('image')==-1){
          pathbd = req.body.path_foto;
        } else {
             // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                // Eliminamos el fichero temporal
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                });
             });
         }
         const foto= target_path;
         const newempleado = {  
          nombres: nombres,
          paterno: priapellido,
          materno: segapellido,
          esposo: casapellido,
          ndi: ci,
          expedido: expedido,
          pais_expedido: paisci,
          foto: pathbd,
          provincia: provincia,
          departamento: departamento,
          pais_nacimiento: paisnac,
          nacionalidad: nacionalidad,
          fecha_nacimiento: fecnac,
          sexo: sexo,
          grupo_sang: sangre,
          estado_civil: ecivil,
          num_serv_mil: lmilitar,
          calle_avenida: calle,
          nro_direccion: num,
          nombre_edificio: nedificio,
          piso_edificio: piso,
          nro_departamento: depto,
          zona: zona,
          telefono: tdomicilio,
          celular: tcelular,
          casilla: casilla,
          email_personal: emailp,
          email_trabajo: emailt,

        };
        modelos.Empleado.update(newempleado, {where: { id: res.locals.user.empleado.id } }).then(newempleado => {
          modelos.Estudios.findAndCountAll({where:{id_empleado:res.locals.user.empleado.id}}).then(newcount=>{

            if(newcount.count==0){
              //asdasd
              var x=null;
              var y=null;
              modelos.Estudios.create({
                nivel:nivel,
                especificacion:especificacion,
                titulo:titulo,
                carrera:carrera,
                institucion:institucion,
                concluida:concluida,
                ciudad:ciudad,
                pais:pais,
                anios_vencidos:anios_vencidos,
                fecha_inicio:fecha_inicio,
                fecha_fin:fecha_fin,
                colegio_prof:colegio_prof,
                nro_registro_prof:nro_registro_prof,
                id_empleado:res.locals.user.empleado.id
              }).then(newestudios=>{
                modelos.Empleado_Idioma.create({
                  lee:lecturaesp,
                  escribe:escrituraesp,
                  habla:hablaesp,
                  id_empleado:res.locals.user.empleado.id,
                  id_idioma:1
                }).then(newidioma1=>{
                  modelos.Empleado_Idioma.create({
                    lee:lecturaing,
                    escribe:escrituraing,
                    habla:hablaing,
                    id_empleado:res.locals.user.empleado.id,
                    id_idioma:2
                  }).then(newidioma2=>{
                  modelos.Empleado_Idioma.create({
                    otro:otro,
                    lee:lecturaotro,
                    escribe:escrituraotro,
                    habla:hablaotro,
                    id_empleado:res.locals.user.empleado.id,
                    id_idioma:id_idioma
                  }).then(newidioma3=>{
                    modelos.Idioma.findAll({
                      attributes: ['id', 'idioma']
                      }).then(Idioma => {
                      modelos.Empleado.findAll({where:{id:res.locals.user.empleado.id}}).then(newemp=>{
                        modelos.Estudios.findAll({where:{id_empleado:res.locals.user.empleado.id}}).then(newest=>{
                          modelos.Empleado_Idioma.findAll({where:{id_empleado:res.locals.user.empleado.id}}).then(newidioma=>{
                            x="checked";
                            res.render('ficha_personal/ficha2',{Idioma:Idioma,newemp:newemp,newest:newest,newidioma:newidioma,x:x,y:y,moment:moment});
                          })
                        })
                      })
                    });
                  })
                })
              })
            })
            }
            else{
              modelos.Idioma.findAll({
                attributes: ['id', 'idioma']
                }).then(Idioma => {
                modelos.Empleado.findAll({where:{id:res.locals.user.empleado.id}}).then(newemp=>{
                  modelos.Estudios.findAll({where:{id_empleado:res.locals.user.empleado.id}}).then(newest=>{
                    modelos.Empleado_Idioma.findAll({where:{id_empleado:res.locals.user.empleado.id}}).then(newidioma=>{
                      if(newest[0].concluida==true){x="checked";}
                      else{y="checked";}
                      res.render('ficha_personal/ficha2',{Idioma:Idioma,newemp:newemp,newest:newest,newidioma:newidioma,x:x,y:y,moment:moment});
                    })
                  })
                })
              });
            }
          })
  })
})
    

module.exports = router;
