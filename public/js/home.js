(function($) {
    
    //En caso de cambio de password
    var id_user = $('#id-usuario').val();
    var res_pass = $('#res-password').val();
    console.log(res_pass);
    if(id_user !== 0 && res_pass=='true'){
        $('#passwordResetModal').modal({backdrop: 'static', keyboard: false});
    }

    // validate the comment form when it is submitted
    $("#form-reset-password").validate({
        rules: {
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            }
        },
        messages: {

            password: {
                required: "Ingrese un nuevo password",
                minlength: "El password debe tener minimo 5 caracteres"
            },
            confirm_password: {
                required: "Ingrese el mismo password",
                minlength: "El password debe tener minimo 5 caracteres",
                equalTo: "Escriba el mismo password"
            }
        },
        errorPlacement: function(label, element) {
          label.addClass('text-danger');
          label.insertAfter(element);
        },
        highlight: function(element, errorClass) {
          $(element).parent().addClass('has-danger')
          $(element).addClass('form-control-danger')
        }
    });

})(jQuery);