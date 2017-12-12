$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $("#asistencia-area").show();
    $("#asistencia-individual").hide();
    $('input[name=tipo_reporte').change(function() {
        tipo_reporte = this.value;
        console.log(tipo_reporte);
        if (tipo_reporte == "area") {
            $("#asistencia-area").show("fast");
            $("#asistencia-individual").hide("fast");
        } else {
            $("#asistencia-area").hide("fast");
            $("#asistencia-individual").show("fast");
        }
    });
});

