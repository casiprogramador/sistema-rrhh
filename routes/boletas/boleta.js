var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');


/* GET login page. */
router.get('/formulario', function(req, res, next) {
   // console.log('USUARIO ID'+res.locals.user.id);
    
    modelos.Tipo_boleta.findAll({
        attributes: ['id', 'tipo_boleta']
    }).then(Tipo_boleta => {
        console.log('holaaaaa'+req.body.fecha_fin)
        console.log(JSON.stringify(Tipo_boleta));
        res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
    });
});

app.post('/formulario', function(req, res){
    sumatoria = req.body.fecha_fin
    console.log(sumatoria);
    })
      .then(sumatoria => {
        res.render('boleta/boleta',{sumatoria:sumatoria});
    })


const ValidateMe = sequelize.define('foo', {
    foo: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: true,         
        notNull: true,           
        notEmpty: true,          
        isAfter: "2017-11-05",   
        isBefore: "2017-11-05",  
        isEven(value) {
        if (parseInt(value) % 2 != 0) {
            throw new Error('Only even values are allowed!')
          }
        }
      }
    }
  });


//Consulta de boletas por id_usuario
router.get('/:id_area/area', function(req, res, next) {
  
    modelos.sequelize.query('SELECT e.id, e.ndi, e.nombres, c.id_empleado, c.id_tipo_empleado, te.id, te.tipo FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te WHERE e.id = c.id_empleado and c.id_empleado= te.id and e.id='+res.locals.user.id+' and e.estado=true').spread((results, metadata) => {
    res.json(results);
    })
    });



    (function($) {
        'use strict';
        $(function() {
          var fecha_inicio = $('body');
          var fecha_fin = $('.content-wrapper');
          var scroller = $('.container-scroller');
          var footer = $('.footer');
          var sidebar = $('.sidebar');
          applyStyles();
          function applyStyles() {
      
            //setting content wrapper height
            if(!fecha_inicio.hasClass("horizontal-menu")) {
              console.log('seleccione una fecha de inicio');(function(){
                if(fecha_inicio.outerHeight() < (fecha_inicio.outerHeight())) {
                  console.log('la fecha inicio no puede ser mayor a la fecha fin');({
                    'min-height':sidebar.outerHeight() - footer.outerHeight()
                  });
                }
            }
            
                if(sidebar.outerHeight() < (contentWrapper.outerHeight() + footer.outerHeight())) {
                  sidebar.css({
                    'min-height':contentWrapper.outerHeight() + footer.outerHeight()
                  });
                }
      
            
            }
            else {
              contentWrapper.css({
                'min-height':'100vh'
              });
            }
      
            //Applying perfect scrollbar
            if(!body.hasClass("rtl")) {
              $('.list-wrapper, ul.chats, .product-chart-wrapper, .table-responsive').perfectScrollbar();
              scroller.perfectScrollbar( {suppressScrollX: true});
              if(body.hasClass("sidebar-fixed")) {
                $('#sidebar .nav').perfectScrollbar();
              }
            }
          }
      
          //Updating contetnt wrapper height to sidebar height on expanding a menu in sidebar
          $('.sidebar [data-toggle="collapse"]').on("click", function(event) {
            var clickedItem = $(this);
            if(clickedItem.attr('aria-expanded') === 'false') {
              var scrollTop = scroller.scrollTop() - 20;
            }
            else {
              var scrollTop = scroller.scrollTop() - 100;
            }
            setTimeout(function(){
                if(contentWrapper.outerHeight()+ footer.outerHeight()!== sidebar.outerHeight()) {
                  applyStyles();
                  scroller.animate({ scrollTop: scrollTop }, 350);
                  scroller.perfectScrollbar('update');
                }
            }, 400);
          })
          $('[data-toggle="minimize"]').on("click", function () {
            if((body.hasClass('sidebar-toggle-display'))||(body.hasClass('sidebar-absolute'))) {
              body.toggleClass('sidebar-hidden');
              applyStyles();
            }
            else {
              body.toggleClass('sidebar-icon-only');
              applyStyles();
            }
          });
      
          //checkbox and radios
          $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
        });
      })(jQuery);

  module.exports = router;


