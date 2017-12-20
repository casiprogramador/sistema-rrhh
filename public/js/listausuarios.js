(function($) {

        
        showSwal = function(type,id_usuario){
            'use strict';
            if(type === 'warning-message-and-cancel'){
              swal({
                title: '¿Esta usted seguro de reiniciar el password?',
                text: "No se podra revertir esta accion",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3071a9',
                cancelButtonColor: '#da163f',
                confirmButtonText: 'Reset Password',
                canselButtonText: 'Cancelar'
              }).then(function () {
                  
                  $.ajax({
                      // la URL para la petición
                      url: '/users/resetpassword/'+id_usuario,
                      type: 'GET',          
                      dataType: 'json',
                      success: function(json) {
                          console.log(json);
                          swal(
                              'Password Reset!',
                              'PASSWORD POR DEFECTO: CARNET DE IDENTIDAD',
                              'success'
                            )
                      },
                      error: function(xhr, status) {
                          console.log(xhr);
                          console.log(status);
                          alert('Disculpe, existió un problema');
                      },
                      complete: function(xhr, status) {
                          //alert('Petición realizada');
          
                      }
                  });
  
            })
  
          }
          }

  
  })(jQuery);
  