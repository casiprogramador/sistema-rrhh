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
var boleta = require('./routes/boletas/boleta');
var listadoboleta = require('./routes/boletas/listadoboleta');
//Reportes de asistencia
var reporteAsistenciaEmpleado = require('./routes/reportesAsistencia/reporteAsistenciaEmpleado');
var reporteAsistenciaAdmin = require('./routes/reportesAsistencia/reporteAsistenciaAdmin');

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
app.use('/boleta',boleta);
app.use('/boleta/listadoboleta',listadoboleta);

app.use('/administrar/boleta',administrar_boleta);
app.use('/cronjob',scripts);

app.use('/personal',ficha_personal_nuevo);
//reportes de Asistencia
app.use('/reportesAsistencia/reporteAsistenciaEmpleado',reporteAsistenciaEmpleado);
app.use('/reportesAsistencia/reporteAsistenciaAdmin',reporteAsistenciaAdmin);

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
