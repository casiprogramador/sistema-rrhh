var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');

/* GET login page. */
router.get('/identificacion_personal', function(req, res, next) {
    res.render('ficha_personal/ficha1');
});


router.get('/identificacion_personal2', function(req, res, next) {
  modelos.Idioma.findAll({
    attributes: ['id', 'idioma']
    }).then(Idioma => {
    res.render('ficha_personal/ficha2',{Idioma:Idioma});
  });  
});


router.get('/identificacion_personal3', function(req, res, next) {
  modelos.Dependiente.findAll({ 
    attributes: ['paterno', 'materno','nombres','desc_otro'],
    // añadir id
    where: { id_empleado: 1 } }).then(dependientes => {
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha3',{dependientes:dependientes});
  })
});

router.get('/identificacion_personal4', function(req, res, next) {
  modelos.Experiencia.findAll({ 
    attributes: ['nombre_empresa', 'cargo','fecha_inicio','fecha_fin'],
    // añadir id
    where: { id_empleado: 1 } }).then(experiencia => {
    // projects will be an array of Project instances with the specified name
    res.render('ficha_personal/ficha4',{experiencia:experiencia});
  })
});


router.get('/identificacion_personal5', function(req, res, next) {
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
router.post('/identificacion_personal', (req, res) => {
    console.log(req);
    var nombres = req.body.nombre;
    const segnombre = req.body.segnombre;
    const priapellido = req.body.priapellido;
    const segapellido = req.body.segapellido;
    const casapellido = req.body.casapellido;
    const ci = req.body.ci;
    const expedido = req.body.expedido;
    const paisci = req.body.paisci;
    //const foto= "req.file.photo.path";
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
    modelos.Empleado.create({
      nombres: nombres+" "+segnombre,
      paterno: priapellido,
      materno: segapellido,
      esposo: casapellido,
      ndi: ci,
      expedido: expedido,
      pais_expedido: paisci,
      //foto: foto,
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



router.post('/identificacion_personal2', (req, res) => {
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
    const colegio_prof = req.body.colegio_prof;
    const nro_registro_prof = req.body.nro_registro_prof;
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
              colegio_prof: colegio_prof,
              nro_registro_prof: nro_registro_prof,
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
                          res.render('ficha_personal/ficha3');
                      })
                  })
              })
          })
    })
});

router.post('/identificacion_personal3', (req, res) => {
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
        attributes: ['paterno', 'materno','nombres','desc_otro'],
        // añadir id
        where: { id_empleado: 1 } }).then(dependientes => {
        // projects will be an array of Project instances with the specified name
        res.render('ficha_personal/ficha3',{dependientes:dependientes});
      })
      //res.render('/identificacion_personal2',{ci:ci});
      //res.json(newempleado);
    })
});


router.post('/identificacion_personal4', (req, res) => {
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

router.post('/identificacion_personal5', (req, res) => {
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

router.post('/identificacion_personal6', (req, res) => {
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

module.exports = router;