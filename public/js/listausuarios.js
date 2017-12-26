(function($) {
    $('#table-usuarios').DataTable({
        "order": [
            [3, "desc"]
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
  