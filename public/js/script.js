(function($) {
    'use strict';
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        orientation: 'bottom',
        autoclose: true,
    });
    $('.clockpicker').clockpicker({
        placement: 'top',
        align: 'left',
        donetext: 'Aceptar'
    });
  })(jQuery);
