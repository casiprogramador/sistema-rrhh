(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');
    applyStyles();
    function applyStyles() {

      //setting content wrapper height
      if(!body.hasClass("horizontal-menu")) {
        setTimeout(function(){
          if(contentWrapper.outerHeight() < (sidebar.outerHeight() - footer.outerHeight())) {
            contentWrapper.css({
              'min-height':sidebar.outerHeight() - footer.outerHeight()
            });
          }

          if(sidebar.outerHeight() < (contentWrapper.outerHeight() + footer.outerHeight())) {
            sidebar.css({
              'min-height':contentWrapper.outerHeight() + footer.outerHeight()
            });
          }

        }, 10);
      }
      else {
        contentWrapper.css({
          'min-height':'100vh'
        });
      }

      //Applying perfect scrollbar
      if(!body.hasClass("rtl")) {
        $('.list-wrapper, ul.chats, .product-chart-wrapper, .table-responsive').perfectScrollbar();
        scroller.perfectScrollbar( {suppressScrollX: true});
        if(body.hasClass("sidebar-fixed")) {
          $('#sidebar .nav').perfectScrollbar();
        }
      }
    }

    //Updating contetnt wrapper height to sidebar height on expanding a menu in sidebar
    $('.sidebar [data-toggle="collapse"]').on("click", function(event) {
      var clickedItem = $(this);
      if(clickedItem.attr('aria-expanded') === 'false') {
        var scrollTop = scroller.scrollTop() - 20;
      }
      else {
        var scrollTop = scroller.scrollTop() - 100;
      }
      setTimeout(function(){
          if(contentWrapper.outerHeight()+ footer.outerHeight()!== sidebar.outerHeight()) {
            applyStyles();
            scroller.animate({ scrollTop: scrollTop }, 350);
            scroller.perfectScrollbar('update');
          }
      }, 400);
    })
    $('[data-toggle="minimize"]').on("click", function () {
      if((body.hasClass('sidebar-toggle-display'))||(body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
        applyStyles();
      }
      else {
        body.toggleClass('sidebar-icon-only');
        applyStyles();
      }
    });

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
  });
})(jQuery);
