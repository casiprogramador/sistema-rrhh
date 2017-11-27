(function($) {
    'use strict';
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        orientation: 'bottom',
        autoclose: true,
    });
    $('.clockpicker').clockpicker({
        placement: 'top',
        align: 'left',
        donetext: 'Aceptar'
    });

})(jQuery);