(function ($) {
    'use strict';
    var validationForm = $("#form-nuevo-personal");
    validationForm.val({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            paterno: {
                required: true,
                minlength: 6,
            }
        }
    });
    validationForm.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            validationForm.validate().settings.ignore = ":disabled,:hidden";
            return validationForm.valid();
        },
        onFinishing: function (event, currentIndex)
        {
            validationForm.validate().settings.ignore = ":disabled";
            return validationForm.valid();
        },
        onFinished: function (event, currentIndex)
        {
            alert("Submitted!");
        }
    });

})(jQuery);
