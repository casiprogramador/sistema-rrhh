(function($) {
    $( "#actualizar-marcacion" ).on( "click", function() {
        $.get("/marcacion/actualizar_asistencia", function(data, status){
            console.log(data);
            
        });
    });

})(jQuery)