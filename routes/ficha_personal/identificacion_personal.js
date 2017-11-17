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
    res.render('ficha_personal/ficha3');
});

router.get('/identificacion_personal4', function(req, res, next) {
    res.render('ficha_personal/ficha4');
});


router.get('/identificacion_personal5', function(req, res, next) {
    res.render('ficha_personal/ficha5');
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
        res.json(newempleado);
      })
});



router.post('/identificacion_personal', (req, res) => {
    console.log(req);
    // actualizacion tabla empleado
    //const ndi = req.body.nit;
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
    const colegio_prof = req.body.colegio_prof;
    const nro_registro_prof = req.body.nro_registro_prof;
    // tabla idiomas
    const lecturaesp =req.body.lecturaesp;
    const escrituraesp =req.body.escrituraesp;
    const hablaesp =req.body.lecturaesp;
    const lecturaing =req.body.lecturaing;
    const escrituraing =req.body.escrituraing;
    const hablaing =req.body.lecturaing;
    const id_otro =req.body.otro;
    const lecturaotro =req.body.lecturaotro;
    const escrituraotro =req.body.escrituraotro;
    const hablaotro =req.body.lecturaotro;
    
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
    modelos.Empleados.update(newempleado, {where: { ndi: ndi } })  
    .then(updatedMax => {
      console.log(updatedMax)
    })
    //insercion de estudios
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
      nro_registro_prof: nro_registro_prof
    })
      .then(newestudios => {
        res.json(newestudios);
    })

    //insercion idiomas_empleados

    modelos.Empleado_Idioma.create(
      {lecturaesp: lecturaesp, escrituraesp: escrituraesp, hablaesp: lecturaesp, id_empleado:id_empleado, id_idioma: 1},
      {lecturaing: lecturaing, escrituraing: escrituraing,hablaing: lecturaing,id_empleado: id_empleado, id_idioma: 2},
      {lecturaotro: lecturaotro, escrituraotro: escrituraotro,hablaotro: lecturaotro,id_empleado:id_empleado, id_otro: otro
      })
      .then(newempleado_idioma => {
        res.json(newempleado_idioma);
    })
});

  
router.post('/identificacion_personal', (req, res) => {
    console.log(req);
    const nombres = req.body.nombres;
    const paterno = req.body.paterno;
    const materno = req.body.materno;
    const sexo = req.body.sexo;
    const fecha_nacimiento = req.body.fecnac;
    const ndi = req.body.ndi;
    const expedido = req.body.expedido;
    const tipo_documento = req.body.tipodoc;
    const num_doc_depen = req.body.nrodoc;
    modelos.Dependiente.create({
      nombres: nombres,
      paterno: paterno,
      materno: materno,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
      ndi: ndi,
      expedido: expedido,
      tipo_documento: tipo_documento,
      num_doc_depen: num_doc_depen
    })
      .then(newdependiente => {
        res.json(newdependiente);
      })
});


router.post('/identificacion_personal', (req, res) => {
    console.log(req);
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
      fecha_fin: fecha_fin
    })
      .then(newexperiencia => {
        res.json(newexperiencia);
      })
});

router.post('/identificacion_personal', (req, res) => {
  console.log(req);
  const nombre = req.body.nombre;
  const relacion = req.body.relacion;
  const telefono = req.body.telefono;
  //id_empleado = req.body.id_empleado;
  modelos.Referencias_personales.create({
    nombre: nombre,
    relacion: relacion,
    telefono: telefono,
    ///id_empleado: id_empleado
  })
    .then(newreferencias_personales => {
      res.json(newreferencias_personales);
    })
});

router.post('/identificacion_personal', (req, res) => {
  console.log(req);
  const nombre = req.body.nombre;
  const institucion = req.body.institucion;
  const telefono = req.body.telefono;
  //id_empleado = req.body.id_empleado;
  modelos.Referencias_personales.create({
    nombre: nombre,
    institucion: institucion,
    telefono: telefono,
    ///id_empleado: id_empleado
  })
    .then(newreferencias_personales => {
      res.json(newreferencias_personales);
    })
});

module.exports = router;