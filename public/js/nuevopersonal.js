(function ($) {
    'use strict';
    var validationForm = $("#form-nuevo-personal");
    validationForm.val({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });
    validationForm.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            validationForm.val({
                ignore: [":disabled",":hidden"]
            })
            return validationForm.val();
        },
        onFinishing: function (event, currentIndex) {
            validationForm.val({
                ignore: [':disabled']
            })
            return validationForm.val();
        },
        onFinished: function (event, currentIndex) {
            alert("Submitted!");
        }
    });

})(jQuery);
