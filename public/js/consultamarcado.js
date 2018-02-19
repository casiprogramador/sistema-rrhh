$(document).ready(function() {
    fecha_reporte = $('#fecha-reporte').text();
    $( "#btnBuscaEmpleado" ).click(function() {
        var x = document.getElementById("empleado-profile");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
    $('#table-consulta-marcado').DataTable({
        dom: 'Bfrtip',
        bSort: false,
        buttons: [{
                extend: 'copy',
                footer: true,
                text: 'COPIAR',
                title: 'REPORTE DE ASISTENCIA ' + fecha_reporte
            },
            {
                extend: 'print',
                footer: true,
                text: 'IMPRIMIR',
                title: 'REPORTE DE ASISTENCIA ' + fecha_reporte
            },
            {
                extend: 'excel',
                footer: true,
                text: 'EXPORTAR EXCEL',
                title: 'REPORTE DE ASISTENCIA  ' + fecha_reporte
            },
            {
                extend: 'pdfHtml5',
                footer: true,
                text: 'EXPORTAR PDF',
                title: 'REPORTE DE ASISTENCIA ' + fecha_reporte,
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
        },

        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total over all pages
            total = api
                .column( 7 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 )
                + api
                .column( 8 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 )
                + api
                .column( 9 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 )
                + api
                .column( 10 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Total over this page
            pageTotal = api
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Update footer
            $( api.column( 4 ).footer() ).html(
                '$'+pageTotal +' ( $'+ total +' total)'
            );
        }
    });

});




