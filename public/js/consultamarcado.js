$(document).ready(function() {
    fecha_reporte = $('#fecha-reporte').text();
    $('#table-consulta-marcado').DataTable({
        dom: 'Bfrtip',
        bSort: false,
        buttons: [{
                extend: 'copy',
                text: 'COPIAR',
                title: 'REPORTE DE ASISTENCIA ' + fecha_reporte
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
                extend: 'pdfHtml5',
                text: 'EXPORTAR PDF',
                title: 'Reporte de Saldo de Vacaciones ' + fecha_reporte,
                orientation: 'landscape'
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

});