(function($) {

    //texto-boleta
    $('#tipo-boleta').on('change', function() {
         var texto_boleta = $( "#tipo-boleta option:selected" ).text();
         console.log(texto_boleta);
         $('#texto-boleta').val(texto_boleta);
    });


    $("#calcular-dias").click(function() {
        var fecha_inicio = $('#fecha-inicio').val();
        var hora_inicio = $('#hora-inicio').val();
        var fecha_fin = $('#fecha-fin').val();
        var hora_fin = $('#hora-fin').val();
        var id_empleado = $('#id-empleado').val();
        var id_tipo_boleta = $("#tipo-boleta option:selected").val();
        var texto_boleta = $("#texto-boleta").val();
        console.log(texto_boleta);
        $.ajax({
            // la URL para la petición
            url: '/boleta/suma',

            data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, hora_inicio: hora_inicio, hora_fin: hora_fin, id_empleado: id_empleado, id_tipo_boleta: id_tipo_boleta, texto_boleta:texto_boleta },

            type: 'GET',

            dataType: 'json',

            success: function(json) {
                console.log(json.dias);
                $('#suma_dias_empleado').val(json.dias);
                if(json.dias == 0){
                    $('#submit-boleta').prop('disabled', true);
                }else{
                    $('#submit-boleta').prop('disabled', false);
                }
            },

            error: function(xhr, status) {
                alert('Disculpe, existió un problema');
            },

            complete: function(xhr, status) {
                //alert('Petición realizada');

            }
        });


    });

})(jQuery);