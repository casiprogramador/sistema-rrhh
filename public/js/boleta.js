(function($) {
    $("#calcular-dias").click(function() {
        var fecha_inicio = $('#fecha-inicio').val();
        var hora_inicio = $('#hora-inicio').val();
        var fecha_fin = $('#fecha-fin').val();
        var hora_fin = $('#hora-fin').val();
        var id_empleado = $('#id-empleado').val();
        var id_tipo_boleta = $("#tipo-boleta option:selected").val();
        console.log(fecha_inicio);
        console.log(hora_inicio);
        console.log(fecha_fin);
        console.log(hora_fin);
        console.log(id_empleado);
        console.log(id_tipo_boleta);
        $.ajax({
            // la URL para la petición
            url: '/boleta/suma',

            data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, hora_inicio: hora_inicio, hora_fin: hora_fin, id_empleado: id_empleado, id_tipo_boleta: id_tipo_boleta },

            type: 'GET',

            dataType: 'json',

            success: function(json) {
                console.log(json);
                $('#suma_dias_empleado').val(json.dias);
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