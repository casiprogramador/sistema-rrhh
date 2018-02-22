(function($) {
    $('#form-guardar-marcacion').submit(function(e){
        $.ajax({
            url : '/marcacion/guardar_marcacion',
            data : $('#form-guardar-marcacion').serialize(),
            type : 'POST',
            dataType : 'json',
            success : function(json) {
                console.log(json);
            },
         
            error : function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete : function(xhr, status) {
                alert('Marcacion actualizada');
            }
        });
        event.preventDefault();
    })

})(jQuery)