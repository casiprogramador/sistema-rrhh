(function($) {
    'use strict';

    var validationForm = $("#form-nuevo-personal");
    validationForm.val({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        messages: {
            paterno: {
                required: "El campo es requerido",
            }
        }
    });
    validationForm.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function(event, currentIndex, newIndex) {
            validationForm.validate().settings.ignore = ":disabled,:hidden";
            console.log(newIndex);
            if (newIndex == 2) {
                var nombres = $('#nombres').val();
                var paterno = $('#paterno').val();
                var materno = $('#materno').val();
                var ci = $('#ci').val();
                console.log(nombres);
                var nombres_array = nombres.split(' ');
                console.log(nombres_array);
                var nombre_user = '';
                $.each(nombres_array, function(key, value) {
                    nombre_user = nombre_user + value.substr(0, 1);
                });
                nombre_user = nombre_user + paterno + materno;
                $('#usuario').val(nombre_user.toLowerCase());
                $('#password').val(ci);
            }
            return validationForm.valid();
        },
        onFinishing: function(event, currentIndex) {
            validationForm.validate().settings.ignore = ":disabled";


            return validationForm.valid();
        },
        onFinished: function(event, currentIndex) {
            validationForm.submit();
        }
    });
    $('.date-picker').datepicker({
        format: 'yyyy-mm-dd',
        orientation: 'bottom',
        autoclose: true,
    });


})(jQuery);