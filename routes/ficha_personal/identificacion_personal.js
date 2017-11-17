var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');

/* GET login page. */
router.get('/identificacion_personal', function(req, res, next) {
    res.render('ficha_personal/ficha1');
});


router.get('/identificacion_personal2', function(req, res, next) {
    res.render('ficha_personal/ficha2');
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

  
module.exports = router;

router.post('/identificacion_personal', (req, res) => {
    console.log(req);
    const nit = req.body.nit;
    const afp = req.body.afp;
    const priapellido = req.body.priapellido;
    const seguro_medico = req.body.segapellido;
    const nro_seguro = req.body.casapellido;
    const tipo_seguro = req.body.ci;
    const nua = req.body.expedido;
    const ren = req.body.paisci;
    const anios_calificados = req.body.provincia;
    const nro_declar_jurada = req.body.departamento;
    const nro_cuenta = req.body.paisnac;
    const banco = req.body.nacionalidad;
    const tipo_cuenta = "";
    //tabla estudios
    const nivel = req.body.sexo;
    const titulo = req.body.sangre;
    const carrera = req.body.ecivil;
    const institucion = req.body.lmilitar;
    const concluida = req.body.calle;
    const ciudad = req.body.num;
    const pais = req.body.nedificio;
    const anios_vencidos = req.body.piso;
    const fecha_inicio = req.body.depto;
    const colegio_prof = req.body.zona;
    const nro_registro_prof = req.body.tdomicilio;
    const tcelular = req.body.tcelular;
    // tabla idiomas
    const idioma = req.body.casilla;
    //const id_empleado = req.body.emailp;
    //tabla empleado_idiomas
    const lee = req.body.emailt;
    const escribe = req.body.emailt;
    const habla = req.body.emailt;
    const id_empleado = req.body.emailt;
    const id_idioma = req.body.emailt;
    /*modelos.Empleado.create({
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
        res.render('ficha_personal/ficha1');
      })*/
});

  
module.exports = router;