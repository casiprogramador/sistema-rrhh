(function($) {

    $('#table-horarios').DataTable({

        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
    $( ".button-opciones" ).on( "click", function() {
        var id_boleta = $(this).attr('id-boleta');
        var id_empleado = $(this).attr('id-empleado');
        var nombre = $(this).attr('nombre');
        var boleta = $(this).attr('boleta');
        var fecha = $(this).attr('fecha');
        var dias = $(this).attr('dias');

        $('#modal-empleado-nombre').val(nombre);
        $('#modal-empleado-fecha').val(fecha);
        $('#modal-empleado-boleta').val(boleta);
        $('#modal-empleado-dias').val(dias);
        $('#input-id-boleta').val(id_boleta);
        $('#input-id-empleado').val(id_empleado);

    });

    $( "#button-boleta" ).on( "click", function() {
        $("#form-aprobar-boleta").submit();
    });


})(jQuery);