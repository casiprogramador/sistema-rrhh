
    $(document).ready(function(){
        url_servidor = 'http://localhost:3000/';
        $( "#fecha-saldo-vacacion").val(getCurrentDate());
        $( "#panel-personal").hide();
        
        $( "#form-saldo-vacacion" ).submit(function( event ) {
          area_form = $( "#areas-select-vacacion option:selected" ).val();
          area_form_name = $( "#areas-select-vacacion option:selected" ).text();
          fecha = $( "#fecha-saldo-vacacion").val();
          tipo = $('input[name=tipo_personal]:checked').val();
          $("#fecha-reporte").text(fecha);
          $( "#panel-personal").show("slow");
          //Ajax jquery
          if(area_form == 1){
            $.ajax({
                          type: 'GET',
                      contentType: 'application/json',
              url: url_servidor+'area',			
              success: function(areas) {
                    $('#table-saldo > tbody tr').remove();
                    
                    $.each(areas, function (key, area) {
  
                        $.ajax({
                            type: 'GET',
                            contentType: 'application/json',
                            url: url_servidor+'empleado/'+area.id +'/area',						
                            success: function(empleado_areas) {
                                if(empleado_areas.length>0){
  
                                  nombre_area = '';
                                  $.each(empleado_areas, function (key, empleado_area) {
                                    
                                    $.ajax({
                                        type: 'GET',
                                        contentType: 'application/json',
                                        url: url_servidor+'empleado/'+empleado_area.id+'/saldovacacion',
                                        data: {
                                          estado_empleado: tipo
                                        },						
                                        success: function(empleado_saldos) {
  
  
                                          tabla = '<tr>'
                                              +'<td colspan="7"><h2>'+area.desc_area+'</h2></td>'
                                              +'</tr>';
                                          if(nombre_area != area.desc_area && empleado_saldos.length > 0){
                                            $('#table-saldo > tbody:last-child').append(tabla);
                                          }
                                          
                                          ci_empleado = '';
                                          tabla_empleado = '';
                                          saldo_vacaciones_total = 0;
                                          $.each(empleado_saldos, function (key, empleado_saldo) {
                                              saldo_vacaciones_total += empleado_saldo.dias
                                          });
                                          $.each(empleado_saldos, function (key, empleado_saldo) {
  
                                              console.log(area.desc_area);
                                              if(ci_empleado !== empleado_saldo.ndi ){
                                                tabla_empleado += '<tr><td>'+empleado_saldo.ndi+'</td>'
                                                      +'<td>'+empleado_saldo.nombres+' '+empleado_saldo.paterno+' '+empleado_saldo.materno+'</td>'
                                                      +'<td>'+empleado_saldo.cargo+'</td>'
                                                      +'<td>'+empleado_saldo.fecha_ingreso+'</td>'
                                                      +'<td></td>'
                                                      +'<td>'+saldo_vacaciones_total+' dias</td>'
                                                      +'<td>'+'<b>Gestion</b>: '+empleado_saldo.gestion+'- <b>Dias Vacacion</b>: '+empleado_saldo.dias+'</td></tr>';
                                              }else{
                                                tabla_empleado +='<tr><td></td><td></td><td></td><td></td><td></td><td></td>'
                                                  +'<td>'+'<b>Gestion</b>: '+empleado_saldo.gestion+'- <b>Dias Vacacion</b>: '+empleado_saldo.dias+'</td></tr>';
                                              }
  
                                              if(key == empleado_saldos.length-1){
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
          }else{
            
            $.ajax({
              type: 'GET',
              contentType: 'application/json',
              url: url_servidor+'empleado/'+area_form+'/area',						
              success: function(empleado_areas) {
                $('#table-saldo > tbody tr').remove();
                tabla = '<tr>'
                    +'<td colspan="7"><h2>'+area_form_name+'</h2></td>'
                    +'</tr>';
              $('#table-saldo > tbody:last-child').append(tabla);
  
                      $.each(empleado_areas, function (key, empleado_area) {
                        $.ajax({
                            type: 'GET',
                            contentType: 'application/json',
                            url: url_servidor+'empleado/'+empleado_area.id+'/saldovacacion',
                            data: {
                               estado_empleado: tipo
                            },							
                            success: function(empleado_saldos) {
  
                            ci_empleado = '';
                            tabla_empleado = '';
                            saldo_vacaciones_total = 0;
                            $.each(empleado_saldos, function (key, empleado_saldo) {
                              saldo_vacaciones_total += empleado_saldo.dias
                            });
                            $.each(empleado_saldos, function (key, empleado_saldo) {
                                             
                                  if(ci_empleado !== empleado_saldo.ndi ){
                                        
                                        tabla_empleado += '<tr><td>'+empleado_saldo.ndi+'</td>'
                                        +'<td>'+empleado_saldo.nombres+' '+empleado_saldo.paterno+' '+empleado_saldo.materno+'</td>'
                                        +'<td>'+empleado_saldo.cargo+'</td>'
                                        +'<td>'+empleado_saldo.fecha_ingreso+'</td>'
                                        +'<td></td>'
                                        +'<td>'+saldo_vacaciones_total+' dias</td>'
                                        +'<td>'+'<b>Gestion</b>: '+empleado_saldo.gestion+'- <b>Dias Vacacion</b>: '+empleado_saldo.dias+'</td></tr>';
                                       
                                        
                                      }else{
                                        tabla_empleado +='<tr><td></td><td></td><td></td><td></td><td></td><td></td>'
                                        +'<td>'+'<b>Gestion</b>: '+empleado_saldo.gestion+'- <b>Dias Vacacion</b>: '+empleado_saldo.dias+'</td></tr>';
                                          
                                    }
  
                                    if(key == empleado_saldos.length-1){
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
      });
  
  
      function getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
  
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        return today;
      }