(function($) {
    'use strict';
    $(function() {
      $('#order-listing').DataTable({
        "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
        "iDisplayLength": 5
      });
      $('.data-table-print').DataTable(
        {
          dom: 'Bfrtip',
          buttons: [
              'copyHtml5',
              'excelHtml5',
              'csvHtml5',
              'pdfHtml5'
          ]
        }
      );
    });
  })(jQuery);
  