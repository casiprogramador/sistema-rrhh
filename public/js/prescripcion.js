$(document).ready(function() {
    $( ".btn-prescripcion" ).on( "click", function() {
        var id_empleado = $(this).attr('id-empleado');
        var cargo = $(this).attr('cargo-empleado');
        var area = $(this).attr('area-empleado');
        $.ajax({
            url : '/vacacion/prescripcion/'+id_empleado+'/saldovacacion',
            type : 'GET',
            dataType : 'json',
            success : function(empleado) {
               $('.check-saldo-prescripcion').remove();
               var nombre_empleado = empleado.nombres+' '+empleado.paterno+' '+empleado.materno;
              
               $('#modal-empleado-nombre').val(nombre_empleado.toUpperCase());
               $('#modal-empleado-area').val(area.toUpperCase());
               $('#modal-empleado-cargo').val(cargo.toUpperCase());

               $.each(empleado.saldovacacion, function (key, saldo) {
                    console.log(empleado.saldovacacion);
                    var check_prescrito = (saldo.prescrito_estado) ? "checked" : "";                    
                    div_check = '<div class="form-check check-saldo-prescripcion"><input class="form-check-input" value="'+saldo.id+'" type="checkbox" '+check_prescrito+' name="saldoid"><label class="">Gestion: '+saldo.gestion+' - Vacacion: '+saldo.dias+' Dias</label></div>';

                    $('#modal-check-vacacion').append(div_check);
               });

            }
        });
      });
      $( "#button-prescripcion" ).on( "click", function() {
        $( "#form-prescripcion" ).submit();
      });
});
    