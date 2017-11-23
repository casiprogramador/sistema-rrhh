$(document).ready(function() {

    //form-busqueda-individual.
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


    url_servidor = '/';
    $("#fecha-saldo-vacacion").val(getCurrentDate());
    $("#panel-personal").hide();

    $("#form-saldo-vacacion").submit(function(event) {
        area_form = $("#areas-select-vacacion option:selected").val();
        area_form_name = $("#areas-select-vacacion option:selected").text();
        fecha = $("#fecha-saldo-vacacion").val();
        tipo = $('input[name=tipo_personal]:checked').val();
        $("#fecha-reporte").text(fecha);
        $("#panel-personal").show("slow");
        //Ajax jquery
        if (area_form == 1) {
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: url_servidor + 'area',
                success: function(areas) {
                    $('#table-saldo > tbody tr').remove();

                    $.each(areas, function(key, area) {

                        $.ajax({
                            type: 'GET',
                            contentType: 'application/json',
                            url: url_servidor + 'empleado/' + area.id + '/area',
                            success: function(empleado_areas) {
                                if (empleado_areas.length > 0) {

                                    nombre_area = '';
                                    $.each(empleado_areas, function(key, empleado_area) {

                                        $.ajax({
                                            type: 'GET',
                                            contentType: 'application/json',
                                            url: url_servidor + 'empleado/' + empleado_area.id + '/saldovacacion',
                                            data: {
                                                estado_empleado: tipo
                                            },
                                            success: function(empleado_saldos) {


                                                tabla = '<tr>' +
                                                    '<td colspan="7"><h2>' + area.desc_area + '</h2></td>' +
                                                    '</tr>';
                                                if (nombre_area != area.desc_area && empleado_saldos.length > 0) {
                                                    $('#table-saldo > tbody:last-child').append(tabla);
                                                }

                                                ci_empleado = '';
                                                tabla_empleado = '';
                                                saldo_vacaciones_total = 0;
                                                $.each(empleado_saldos, function(key, empleado_saldo) {
                                                    saldo_vacaciones_total += empleado_saldo.dias
                                                });
                                                $.each(empleado_saldos, function(key, empleado_saldo) {
                                                    var fecha_ingreso = new Date(empleado_saldo.fecha_ingreso );
                                                    //console.log(area.desc_area);
                                                    if (ci_empleado !== empleado_saldo.ndi) {
                                                        tabla_empleado += '<tr><td>' + empleado_saldo.ndi + '</td>' +
                                                            '<td>' + empleado_saldo.nombres + ' ' + empleado_saldo.paterno + ' ' + empleado_saldo.materno + '</td>' +
                                                            '<td>' + empleado_saldo.cargo + '</td>' +
                                                            '<td>' + getFormattedDate(fecha_ingreso)+ '</td>' +
                                                            '<td>' + saldo_vacaciones_total + ' dias</td>' +
                                                            '<td>' + '<b>Gestion</b>: ' + empleado_saldo.gestion + '- <b>Dias Vacacion</b>: ' + empleado_saldo.dias + '</td></tr>';
                                                    } else {
                                                        tabla_empleado += '<tr><td></td><td></td><td></td><td></td><td></td>' +
                                                            '<td>' + '<b>Gestion</b>: ' + empleado_saldo.gestion + '- <b>Dias Vacacion</b>: ' + empleado_saldo.dias + '</td></tr>';
                                                    }

                                                    if (key == empleado_saldos.length - 1) {
                                                        $('#table-saldo > tbody:last-child').append(tabla_empleado);
                                                    }
                                                    nombre_area = area.desc_area;
                                                    ci_empleado = empleado_saldo.ndi;
                                                });

                                            }
                                        });
                                    });

                                }
                            }
                        });
                    })

                }
            });
        } else {

            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: url_servidor + 'empleado/' + area_form + '/area',
                success: function(empleado_areas) {
                    $('#table-saldo > tbody tr').remove();
                    tabla = '<tr>' +
                        '<td colspan="7"><h2>' + area_form_name + '</h2></td>' +
                        '</tr>';
                    $('#table-saldo > tbody:last-child').append(tabla);

                    $.each(empleado_areas, function(key, empleado_area) {
                        $.ajax({
                            type: 'GET',
                            contentType: 'application/json',
                            url: url_servidor + 'empleado/' + empleado_area.id + '/saldovacacion',
                            data: {
                                estado_empleado: tipo
                            },
                            success: function(empleado_saldos) {

                                ci_empleado = '';
                                tabla_empleado = '';
                                saldo_vacaciones_total = 0;
                                $.each(empleado_saldos, function(key, empleado_saldo) {
                                    saldo_vacaciones_total += empleado_saldo.dias
                                });
                                $.each(empleado_saldos, function(key, empleado_saldo) {

                                    if (ci_empleado !== empleado_saldo.ndi) {

                                        tabla_empleado += '<tr><td>' + empleado_saldo.ndi + '</td>' +
                                            '<td>' + empleado_saldo.nombres + ' ' + empleado_saldo.paterno + ' ' + empleado_saldo.materno + '</td>' +
                                            '<td>' + empleado_saldo.cargo + '</td>' +
                                            '<td>' + empleado_saldo.fecha_ingreso + '</td>' +
                                            '<td>' + saldo_vacaciones_total + ' dias</td>' +
                                            '<td>' + '<b>Gestion</b>: ' + empleado_saldo.gestion + '- <b>Dias Vacacion</b>: ' + empleado_saldo.dias + '</td></tr>';


                                    } else {
                                        tabla_empleado += '<tr><td></td><td></td><td></td><td></td><td></td>' +
                                            '<td>' + '<b>Gestion</b>: ' + empleado_saldo.gestion + '- <b>Dias Vacacion</b>: ' + empleado_saldo.dias + '</td></tr>';

                                    }

                                    if (key == empleado_saldos.length - 1) {
                                        $('#table-saldo > tbody:last-child').append(tabla_empleado);
                                    }

                                    ci_empleado = empleado_saldo.ndi;

                                });
                            }
                        });
                    });

                }
            });
        }

        event.preventDefault();
    });

    $("#form-busqueda-individual").submit(function(event) {
        ci_persona = $("#ci-empleado").val();
        //console.log(ci_persona);
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url:'/empleado/' + ci_persona + '/saldovacacionndi',
            success: function(empleados) {
                
                $('#table-saldo > tbody tr').remove();
                $("#panel-personal").show("slow");
                area = empleados[0].desc_area;
                tabla = '<tr>' +
                '<td colspan="7"><h2>' + area + '</h2></td>' +
                '</tr>';
                $('#table-saldo > tbody:last-child').append(tabla);
                tabla_empleado = '';
                //console.log(area);
                saldo_vacaciones_total = 0;
                $.each(empleados, function(key, empleado) {
                    saldo_vacaciones_total += empleado.dias
                });
                $.each(empleados, function(key, empleado) {
                    console.log(key);
                    if(key == 0){
                        tabla_empleado += '<tr><td>' + empleado.ndi + '</td>' +
                        '<td>' + empleado.nombres + ' ' + empleado.paterno + ' ' + empleado.materno + '</td>' +
                        '<td>' + empleado.cargo + '</td>' +
                        '<td>' + empleado.fecha_inicio + '</td>' +
                        '<td>' + saldo_vacaciones_total + ' dias</td>' +
                        '<td>' + '<b>Gestion</b>: ' + empleado.gestion + '- <b>Dias Vacacion</b>: ' + empleado.dias + '</td></tr>';
    
                    }else{
                        tabla_empleado += '<tr><td></td><td></td><td></td><td></td><td></td>' +
                        '<td>' + '<b>Gestion</b>: ' + empleado.gestion + '- <b>Dias Vacacion</b>: ' + empleado.dias + '</td></tr>';
                    }

                });
                $('#table-saldo > tbody:last-child').append(tabla_empleado);
            }
        });
        
        event.preventDefault();
    });
    
});


function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function fnExcelReport(id, name) {
    var tab_text = '\uFEFF';
    tab_text = tab_text + '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    tab_text = tab_text + '<head>';
    tab_text = tab_text + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    tab_text = tab_text + '<meta name="ProgId" content="Excel.Sheet" />';
    tab_text = tab_text + '<meta name="Generator" content="Microsoft Excel 11" />';
    tab_text = tab_text + '<title>Sample</title>';
    tab_text = tab_text +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook>';
    tab_text = tab_text + '</xml><![endif]--></head><body>';
    tab_text = tab_text + '<table border="1px">';
    var exportTable = $('#' + id).clone();
    exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
    tab_text = tab_text + exportTable.html();
    tab_text = tab_text + '</table></body></html>';

    var fileName = name + '_' + parseInt(Math.random() * 10000000000) + '.xls';
    var blob = new Blob([tab_text], { type: "application/vnd.ms-excel" })
    window.saveAs(blob, fileName);
}

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
