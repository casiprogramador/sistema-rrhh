(function($) {
    'use strict';
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        orientation: 'bottom',
        autoclose: true,
    });
    $('.clockpicker').clockpicker({
        placement: 'bottom',
        align: 'left',
        donetext: 'Aceptar'
    });

})(jQuery);