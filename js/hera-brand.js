// hera Brand JS
$(document).ready(function () {
  preventDefaultAnchor();

  if($(document).scrollTop() === 0) {
    $('section:eq(0)').addClass('on');
  }
  
  $(window).on('scroll', function() {
    checkVisibility('section');
  });

});

function checkVisibility(selector) {
  $(selector).each(function () {
    var $selector = $(this);
    var scrollAmt = $(document).scrollTop(); //scroll bar의 현재 위치
    var min = $selector.offset().top - ($(window).height() / 2);
    var max = $selector.offset().top + ($(window).height() / 2);
    console.log(min + ' ~ ' + max + ' : ' + scrollAmt);

    if (scrollAmt > min && scrollAmt <= max) {
      $selector.addClass('on');
    } else {
      $selector.removeClass('on');
    }

  });
}



function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}