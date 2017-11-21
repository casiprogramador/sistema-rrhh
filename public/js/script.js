(function($) {
    'use strict';
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        orientation: 'bottom',
        autoclose: true,
    });
    $('.clockpicker').clockpicker({
        placement: 'top',
        align: 'left',
        donetext: 'Aceptar'
    });
    
  })(jQuery);

