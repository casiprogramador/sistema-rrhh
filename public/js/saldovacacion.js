$(document).ready(function() {
    fecha_reporte = $('#fecha-reporte').text();
    $('#table-saldo').DataTable({
        dom: 'Bfrtip',
        bSort: false,
        buttons: [{
                extend: 'copy',
                text: 'COPIAR',
                title: 'Reporte de Saldo de Vacaciones ' + fecha_reporte
            },
            {
                extend: 'print',
                text: 'IMPRIMIR',
                title: 'Reporte de Saldo de Vacaciones ' + fecha_reporte
            },
            {
                extend: 'excel',
                text: 'EXPORTAR EXCEL',
                title: 'Reporte de Saldo de Vacaciones ' + fecha_reporte
            },
            {
                extend: 'pdf',
                text: 'EXPORTAR PDF',
                title: 'Reporte de Saldo de Vacaciones ' + fecha_reporte
            }
        ],
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
    $("#form-busqueda-area").show();
    $("#form-busqueda-individual").hide();
    $('input[name=tipo_reporte').change(function() {
        tipo_reporte = this.value;
        console.log(tipo_reporte);
        if (tipo_reporte == "area") {
            $("#form-busqueda-area").show("fast");
            $("#form-busqueda-individual").hide("fast");
        } else {
            $("#form-busqueda-area").hide("fast");
            $("#form-busqueda-individual").show("fast");
        }
    });
});