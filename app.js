var express = require('express');
var engine = require('ejs-mate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
// routes import
var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var home = require('./routes/home');
var area = require('./routes/area');
var empleado = require('./routes/empleado');
var vacacion_saldo = require('./routes/vacacion/saldo');
var vacacion_prescripcion = require('./routes/vacacion/prescripcion');
var boleta = require('./routes/boletas/boleta');
var administrar_boleta = require('./routes/administrar/boleta');
var administrar_boleta_area = require('./routes/administrar/boleta_area');
//Boletas
var boleta = require('./routes/boletas/boleta');
var listadoboleta = require('./routes/boletas/listadoboleta');
var lista_horario = require('./routes/horario/lista_horario');
var nuevo_horario = require('./routes/horario/nuevo_horario');
var lista_asignacion_horario = require('./routes/horario/lista_asignacion_horario');
//Horario Especial
var lista_horario_especial = require('./routes/horario/lista_horario_especial');
var asignar_horario_especial = require('./routes/horario/asignar_horario_especial');
//var asignar_horario_especial_usuario = require('./routes/horario/asignar_horario_especial_usuario');
//Feriado
var feriado = require('./routes/parametro/feriado');
var cargo_nuevo = require('./routes/parametro/cargo_nuevo');
var area = require('./routes/parametro/area');
var lista_area = require('./routes/parametro/lista_area');
var lista_cargo = require('./routes/parametro/lista_cargo');


//Reportes de asistencia
var reporteAsistenciaEmpleado = require('./routes/reportesAsistencia/reporteAsistenciaEmpleado');
var reporteAsistenciaArea = require('./routes/reportesAsistencia/reporteAsistenciaArea');

//var consultamarcado = require('./routes/formulario/consultamarcado');
var marcacion = require('./routes/marcacion/marcacion');
var marcaciones = require('./routes/marcacion/marcacion');
//var consultamarcado = require('./routes/formulario/consultamarcado');
var marcacion=require('./routes/marcacion/marcacion');
var marcaciones=require('./routes/marcacion/marcacion');
var guardar_marcacion=require('./routes/marcacion/marcacion');



var ficha_personal_nuevo = require('./routes/ficha_personal/nuevo_personal');
var ficha_personal_identificacion = require('./routes/ficha_personal/identificacion_personal');
var ficha_personal_datoslaborales = require('./routes/ficha_personal/identificacion_personal');
var ficha_personal_dependientes = require('./routes/ficha_personal/identificacion_personal');
var ficha_personal_experiencia = require('./routes/ficha_personal/identificacion_personal');
var ficha_personal_referencias = require('./routes/ficha_personal/identificacion_personal');


var scripts = require('./routes/script/cronjob');
var ficha_personal_reporte = require('./routes/ficha_personal/identificacion_personal');
var ficha_personal_inicio = require('./routes/ficha_personal/identificacion_personal');
//CAS
var lista_cas = require('./routes/vacacion/cas');
//Contratos
var contratos = require('./routes/contrato/contrato');

//var marcacion = require('./routes/marcacion/marcacion');
// sequelize
var Sequelize = require("sequelize");
var app = express();

//subida de imagenes

var multipart = require('connect-multiparty');
app.use(multipart()); //Express 4



// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', express.static('public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'clavesecreta',
  resave: true,
  saveUninitialized: true
}));

//upload
/*app.use(express.bodyParser({uploaddir:'./uploads'}));
var body_parser   = require('body-parser')
app.use(body_parser()) //Express 4
var multipart = require('connect-multiparty');
app.use(multipart()) //Express 4*/



// Init passport
app.use(passport.initialize());
app.use(passport.session());

//Express mesages
app.use(flash());
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error_msg1 = req.flash('error_msg1');
  res.locals.error_msg2 = req.flash('error_msg2');
  res.locals.error_msg3 = req.flash('error_msg3');
  res.locals.error_msg4 = req.flash('error_msg4');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  
  next();
})

// Express message

app.use(require('connect-flash')());
app.use((req, res, next)=>{
  res.locals.message = require('express-messages')(req, res);
  next();
})
// Express validator

app.use(expressValidator({
  errorFormatter: function(params, msg, value){
    var namespace = params.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '['+namespace.shift()+']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// flash
app.use(flash());
app.use(cookieParser());

// routes
app.use('/', login);
app.use('/users', users);
app.use('/home', home);
app.use('/area', area);
app.use('/empleado', empleado);
app.use('/vacacion/saldo',vacacion_saldo);
app.use('/vacacion/prescripcion',vacacion_prescripcion);
//Boletas
app.use('/boleta',boleta);
app.use('/boleta/listadoboleta',listadoboleta);
//Horarios

app.use('/horario/lista_horario',lista_horario);
app.use('/horario/nuevo_horario',nuevo_horario);
app.use('/horario/lista_asignacion_horario',lista_asignacion_horario);
//Horarios Especiales
app.use('/horario/lista_horario_especial',lista_horario_especial);
app.use('/horario/asignar_horario_especial',asignar_horario_especial);
//app.use('/horario/asignar_horario_especial',asignar_horario_especial_usuario);


//Feriado
app.use('/feriado',feriado);
app.use('/cargo_nuevo',cargo_nuevo);
app.use('/area',area);
app.use('/lista_area',lista_area);
app.use('/lista_cargo',lista_cargo);

app.use('/administrar/boleta',administrar_boleta);
app.use('/administrar/boleta_area',administrar_boleta_area);
app.use('/cronjob',scripts);

app.use('/personal',ficha_personal_nuevo);
//reportes de Asistencia
app.use('/reportesAsistencia/reporteAsistenciaEmpleado',reporteAsistenciaEmpleado);
app.use('/reportesAsistencia/reporteAsistenciaArea',reporteAsistenciaArea);

//app.use('/formularios/consultamarcado',consultamarcado);
app.use('/marcacion',marcacion);
app.use('/marcacion',marcaciones);
app.use('/marcacion',guardar_marcacion);
//app.use('/marcacion',dispositivos);
//Ficha personal
app.use('/ficha_personal',ficha_personal_identificacion);
app.use('/ficha_personal',ficha_personal_datoslaborales);
app.use('/ficha_personal',ficha_personal_dependientes);
app.use('/ficha_personal',ficha_personal_experiencia);
app.use('/ficha_personal',ficha_personal_referencias);
app.use('/ficha_personal',ficha_personal_reporte);
app.use('/ficha_personal',ficha_personal_inicio);

//CAS
app.use('/vacacion/cas',lista_cas);
//Contrato
app.use('/contrato',contratos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});ficha_personal_nuevo

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
