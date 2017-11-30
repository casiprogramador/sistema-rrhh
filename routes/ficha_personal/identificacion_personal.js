var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
var path = require('path');
var md_auth = require('../../middleware/authenticated');


/* GET login page. */
router.get('/identificacion_personal0',md_auth.ensureAuth, function(req, res, next) {
  res.render('ficha_personal/ficha0');
});

router.get('/identificacion_personal',md_auth.ensureAuth, function(req, res, next) {
  modelos.Empleado.findAll({ 
    where: { id: 1 } }).then(newempleado => {
      modelos.Empleado.findAndCountAll({
        where: { id: 1 } }).then(countempleado => {
            var sw=0;
            var x=null;
            var y=null;
            if(countempleado.count==1){
              sw=1;
              if(newempleado[0].sexo=='M'){
                x="checked";
              }
              else{
                  y="checked";
              }
            }
            res.render('ficha_personal/ficha1',{newempleado:newempleado,sw:sw,moment:moment,x:x,y:y});
          })
});
});


router.get('/identificacion_personal2',md_auth.ensureAuth, function(req, res, next) {
  modelos.Idioma.findAll({
    attributes: ['id', 'idioma']
    }).then(Idioma => {
    res.render('ficha_personal/ficha2',{Idioma:Idioma});
  });  
});


router.get('/identificacion_personal3',md_auth.ensureAuth, function(req, res, next) {
  modelos.Dependiente.findAll({ 
    attributes: ['id','paterno', 'materno','nombres','desc_otro'],
    // añadir id
    where: { id_empleado: 1 } }).then(dependientes => {
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha3',{dependientes:dependientes});
  })
});

router.get('/identificacion_personal4',md_auth.ensureAuth, function(req, res, next) {
  modelos.Experiencia.findAll({ 
    attributes: ['nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
    // añadir id
    where: { id_empleado: 1 } }).then(experiencia => {
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha4',{experiencia:experiencia});
  })
});



router.get('/identificacion_personal5',md_auth.ensureAuth, function(req, res, next) {
  modelos.Referencias_Personales.findAll({ 
    attributes: ['nombre', 'relacion','telefono'],
    // añadir id
    where: { id_empleado: 1 } }).then(referencias_personales => {
    // projects will be an array of Project instances with the specified name
    modelos.Referencias_Trabajo.findAll({ 
      attributes: ['nombre', 'institucion','telefono'],
      // añadir id
      where: { id_empleado: 1 } }).then(referencias_trabajo => {
      // projects will be an array of Project instances with the specified name
      res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
    })
  })
});



//registro de empleado1
router.post('/identificacion_personal',md_auth.ensureAuth, (req, res) => {
  console.log(req.files);
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
    console.log(req.files);
    var tmp_path = req.files.foto.path;
    // Ruta donde colocaremos las imagenes
    var target_path = "public/fotos/"+ci+".jpeg";
    var pathbd="/fotos/"+ci+".jpeg";
   // Comprobamos que el fichero es de tipo imagen
    if (req.files.foto.type.indexOf('image')==-1){
                res.send('El fichero que deseas subir no es una imagen');
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

    modelos.Empleado.create({
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
      email_trabajo: emailt
    })
      .then(newempleado => {
        modelos.Idioma.findAll({
          attributes: ['id', 'idioma']
          }).then(Idioma => {
          res.render('ficha_personal/ficha2',{Idioma:Idioma,id:newempleado.id});
        });
        //res.render('/identificacion_personal2',{ci:ci});
        //res.json(newempleado);
      })
});



router.post('/identificacion_personal2',md_auth.ensureAuth, (req, res) => {
    console.log(req);
    // actualizacion tabla empleado
    console.log(req);
    const id_empleado = req.body.id_empleado;
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
    const col_profesional = req.body.col_profesional;
    const nro_registro_pro = req.body.nro_registro_pro;
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
    modelos.Empleado.update(newempleado, {where: { id: id_empleado } })  
          .then(updatedMax => {
            modelos.Estudios.create({
              nivel: nivel,
              especificacion: especificacion,
              titulo: titulo,
              carrera: carrera,
              institucion: institucion,
              concluida: concluida,
              ciudad: ciudad,
              pais: pais,
              anios_vencidos: anios_vencidos,
              fecha_inicio: req.body.fecha_inicio,
              col_profesional: col_profesional,
              nro_registro_pro: nro_registro_pro,
              id_empleado: id_empleado
            })
            .then(newestudios => {
              modelos.Empleado_Idioma.create(
                {lee: lecturaesp, escribe: escrituraesp, habla: hablaesp, id_empleado:id_empleado, id_idioma: 1})
                .then(newempleado_idioma1 => {
                  modelos.Empleado_Idioma.create(
                    {lee: lecturaing, escribe: escrituraing, habla: hablaing, id_empleado: id_empleado, id_idioma: 2})
                    .then(newempleado_idioma2 => {
                      modelos.Empleado_Idioma.create(
                        {lee: lecturaotro, escribe: escrituraotro, habla: hablaotro, id_empleado:id_empleado, id_otro: otro
                        })
                        .then(newempleado_idioma3 => {
                          res.render('ficha_personal/ficha1');
                      })
                  })
              })
          })
    })
});

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
    id_empleado: 1
  })
    .then(newdependiente => {
      modelos.Dependiente.findAll({ 
        attributes: ['id','paterno', 'materno','nombres','desc_otro'],
        // añadir id
        where: { id_empleado: 1 } }).then(dependientes => {
        // projects will be an array of Project instances with the specified name
        res.render('ficha_personal/ficha3',{dependientes:dependientes});
      })
      //res.render('/identificacion_personal2',{ci:ci});
      //res.json(newempleado);
    })
});


router.post('/identificacion_personal4',md_auth.ensureAuth, (req, res) => {
    const nombre_empresa = req.body.nombre_empresa;
    const tipo_empresa = req.body.tipo_empresa;
    const cargo = req.body.cargo;
    const pais = req.body.pais;
    const ciudad = req.body.ciudad;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;
    modelos.Experiencia.create({
      nombre_empresa: nombre_empresa,
      tipo_empresa: tipo_empresa,
      cargo: cargo,
      pais: pais,
      ciudad: ciudad,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      id_empleado:1
    })
      .then(newexperiencia => {
        modelos.Experiencia.findAll({ 
          attributes: ['nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
          // añadir id
          where: { id_empleado: 1 } }).then(experiencia => {
          // projects will be an array of Project instances with the specified name
          res.render('ficha_personal/ficha4',{experiencia:experiencia});
        })
      })
});

router.post('/identificacion_personal5',md_auth.ensureAuth, (req, res) => {
  const nombrep = req.body.nombrep;
  const relacion = req.body.relacion;
  const telefonop = req.body.telefonop;
  //id_empleado = req.body.id_empleado;
  modelos.Referencias_Personales.create({
    nombre: nombrep,
    relacion: relacion,
    telefono: telefonop,
    id_empleado: 1
  })
    .then(newreferencias_personales => {
      modelos.Referencias_Personales.findAll({ 
        attributes: ['nombre', 'relacion','telefono'],
        // añadir id
        where: { id: 1 } }).then(referencias_personales => {
        // projects will be an array of Project instances with the specified name
        modelos.Referencias_Trabajo.findAll({ 
          attributes: ['nombre', 'institucion','telefono'],
          // añadir id
          where: { id_empleado: 1 } }).then(referencias_trabajo => {
          // projects will be an array of Project instances with the specified name
          res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
        })
      })
      })
});

router.post('/identificacion_personal6',md_auth.ensureAuth, (req, res) => {
  const nombrei = req.body.nombrei;
  const institucion = req.body.institucion;
  const telefonoi = req.body.telefonoi;
  //id_empleado = req.body.id_empleado;
  modelos.Referencias_Trabajo.create({
    nombre: nombrei,
    institucion: institucion,
    telefono: telefonoi,
    id_empleado: 1
  })
    .then(referencias_trabajo => {
      modelos.Referencias_Personales.findAll({ 
        attributes: ['nombre', 'relacion','telefono'],
        // añadir id
        where: { id_empleado: 1 } }).then(referencias_personales => {
        // projects will be an array of Project instances with the specified name
        modelos.Referencias_Trabajo.findAll({ 
          attributes: ['nombre', 'institucion','telefono'],
          // añadir id
          where: { id_empleado: 1 } }).then(referencias_trabajo => {
          // projects will be an array of Project instances with the specified name
          res.render('ficha_personal/ficha5',{referencias_personales:referencias_personales, referencias_trabajo:referencias_trabajo});
        })
      })
      })
    })



    //registro de empleado1
router.post('/elimina_dependiente',md_auth.ensureAuth, (req, res) => {
  const id = req.body.id_dependiente
  modelos.Dependiente.destroy({  
    where: { id: id }
  })
  .then(deletdependiente => {
    modelos.Dependiente.findAll({ 
      attributes: ['id','paterno', 'materno','nombres','desc_otro'],
      // añadir id
      where: { id_empleado: 1 } }).then(dependientes => {
      // projects will be an array of Project instances with the specified name
      res.render('ficha_personal/ficha3',{dependientes:dependientes}); 
    })
  });
});


/*router.get('/ficha_personal', function(req, res, next) {
  res.render('ficha_personal/ficha_personal');
});*/

router.get('/ficha_personal',md_auth.ensureAuth, (req, res) => {
  const nombrei = req.body.nombrei;
      modelos.Empleado.findAll({
        where: { id: 1 } }).then(newempleado => {
        // projects will be an array of Project instances with the specified name
        modelos.Estudios.findAll({ 
          where: { id_empleado: 1 } }).then(newestudios => {
          // projects will be an array of Project instances with the specified name
          modelos.Empleado_Idioma.findAll({ 
            where: { id_empleado: 1 } }).then(newempleado_idioma => {
            // projects will be an array of Project instances with the specified name
            modelos.Dependiente.findAll({ 
              where: { id_empleado: 1 } }).then(newdependiente => {
              // projects will be an array of Project instances with the specified name
              modelos.Experiencia.findAll({ 
                where: { id_empleado: 1 } }).then(newexperiencia => {
                // projects will be an array of Project instances with the specified name
                modelos.Referencias_Personales.findAll({ 
                  where: { id_empleado: 1 } }).then(newreferencias_personales => {
                  // projects will be an array of Project instances with the specified name
                  modelos.Referencias_Trabajo.findAll({ 
                    where: { id_empleado: 1 } }).then(newreferencias_trabajo => {
                    // projects will be an array of Project instances with the specified name
                    //console.log({newempleado:newempleado,newestudios:newestudios,newempleado_idioma:newempleado_idioma,newdependiente:newdependiente,newexperiencia:newexperiencia,newreferencias_personales:newreferencias_personales,newreferencias_trabajo:newreferencias_trabajo});
                    res.render('ficha_personal/ficha_personal',{newempleado:newempleado,newestudios:newestudios,newempleado_idioma:newempleado_idioma,newdependiente:newdependiente,newexperiencia:newexperiencia,newreferencias_personales:newreferencias_personales,newreferencias_trabajo:newreferencias_trabajo});
                  })
                })
              })
            })
          })
        })
      })
    })


    //actualizaciones de formularios

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
        console.log(req.files);
        var tmp_path = req.files.foto.path;
        // Ruta donde colocaremos las imagenes
        var target_path = "public/fotos/"+ci+".jpeg";
        var pathbd="/fotos/"+ci+".jpeg";
       // Comprobamos que el fichero es de tipo imagen
        if (req.files.foto.type.indexOf('image')==-1){
                    res.send('El fichero que deseas subir no es una imagen');
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
          email_trabajo: emailt
        };
        modelos.Empleado.update(newempleado, {where: { id: 1 } }).then(newempleado => {
          modelos.Idioma.findAll({
            attributes: ['id', 'idioma']
            }).then(Idioma => {
            res.render('ficha_personal/ficha2',{Idioma:Idioma,id:newempleado.id});
          });
          //res.render('/identificacion_personal2',{ci:ci});
          //res.json(newempleado);
        })
}
);
    

module.exports = router;
