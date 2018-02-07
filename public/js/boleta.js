(function($) {
    $('#motivo').hide();
    $('#fucov').hide();
    $('#fecha-viaje-comision').hide();
    $('#lugar').hide();
    $('#olvido-marcado').hide();
    $('#fecha-inicio-block').show();
    $('#fecha-fin-block').show();
    $('#tiempo-solicitado').show();
    $('#submit-boleta').prop('disabled', true);
    //texto-boleta
    $('#tipo-boleta').on('change', function() {
         var texto_boleta = $( "#tipo-boleta option:selected" ).text();
         var id_boleta = $("#tipo-boleta option:selected").val();

         $('#texto-boleta').val(texto_boleta);

         if(id_boleta == 6){
            console.log('Boleta Viaje');
            $('#motivo').show("fast");
            $('#fucov').show("fast");
            $('#fecha-viaje-comision').show("fast");
            $('#lugar').show("fast");
         }else if(id_boleta == 5){
            console.log('Boleta Salida Comision');
            $('#motivo').show("fast");
            $('#fucov').hide();
            $('#fecha-viaje-comision').hide();
            $('#lugar').show("fast");
         }else if(id_boleta == 3){
            console.log('Boleta Permiso sin gose');
            $('#motivo').show("fast");
            $('#fucov').hide();
            $('#fecha-viaje-comision').hide();
            $('#lugar').hide();
         }else if(id_boleta == 14){
            $('#olvido-marcado').show();
            $('#fecha-inicio-block').hide();
            $('#fecha-fin-block').hide();
            $('#motivo').hide();
            $('#fucov').hide();
            $('#fecha-viaje-comision').hide();
            $('#lugar').hide();
            $('#tiempo-solicitado').hide();
            $('#submit-boleta').prop('disabled', false);
         }else{
            console.log('Boleta general');
            $('#motivo').hide();
            $('#fucov').hide();
            $('#fecha-viaje-comision').hide();
            $('#lugar').hide();
            $('#olvido-marcado').hide();
            $('#fecha-inicio-block').show();
            $('#fecha-fin-block').show();
            $('#tiempo-solicitado').show();
         }
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