// hera Common JS
$(document).ready(function () {
  preventDefaultAnchor();
  scrollEvent();
  navigation();
  footerToggleButton();
});

function scrollEvent() {
  document.addEventListener('scroll', function () {
    // 변수 선언
    var scrollLocation = document.documentElement.scrollTop; //현재 스크롤바 위치
    var element = document.getElementById('header');

    // method: scrollTop이 0이라면 open 떼고 아니면 붙이기
    if (scrollLocation === 0) {
      element.classList.remove('open');
    } else {
      element.classList.add('open');
    }
  });
}

function navigation() {
  document.querySelectorAll('#nav > ul > li > a').forEach(function (el, i) {

    // event: mouseover
    el.addEventListener('mouseover', function () {
      // 변수 선언

      var index = Array.from(document.querySelectorAll('#nav > ul > li > a')).indexOf(this);
      // console.log(index);

      // 이벤트1 : 해당하는 box보여주기
      document.querySelectorAll('#nav > ul > li').forEach(function (el, i) {
        el.classList.remove('on');
      });
      document.querySelector('#nav > ul > li:nth-child(' + (index + 1) + ')').classList.add('on');
      // header의 높이 줄이기
      document.querySelector('header#header').classList.add('open');
    });


    // // event: mouseleave :: 마우스가 nav tag밖으로 나가면 취소
    document.querySelector('#nav').addEventListener('mouseleave', function () {
      document.querySelectorAll('#nav > ul > li').forEach(function (el, i) {
        el.classList.remove('on');
      });
      // header 그대로
      document.querySelector('header#header').classList.remove('open');
    });
  });
}


function footerToggleButton() {
  var height = $('#footer .footer-inner').innerHeight();

  $('#footer button.footer-toggle-button').on('click', function () {

    $(this).toggleClass('on');
    $('#footer div.more-footer').toggleClass('on');

    // button.footer-toggle-button 에 on 이 붙으면
    if ($('#footer button.footer-toggle-button').hasClass('on') === true) {
      $('#footer div.more-footer').css({
        'height': height + 'px'
      });
    } else {
      $('#footer div.more-footer').css({
        'height': 0
      });
    }
  });

  $('#footer button.footer-dropdown-selector').on('click', function () {
    $(this).toggleClass('on');
    var sumHeight = 0;
    $('#footer ul.footer-dropdown-option > li > a').each(function () {
      sumHeight += $(this).outerHeight(true);
    });

    $('#footer .footer-dropdown-option').toggleClass('on');

    if ($(this).hasClass('on') === true) {
      $('#footer div.more-footer').css({
        'height': height + sumHeight + 'px'
      });
    } else {
      $('#footer div.more-footer').css({
        'height': height + 'px'
      });
    }

  });

      $('#footer .footer-dropdown-option > li > a').on('click', function() {
      $this = $(this);
      if($('#footer > section').hasClass('mobile')) {
        var index = $('#footer ul.footer-dropdown-option > li').index($this.parent());
        $('#footer .footer-dropdown-option > li').removeClass('on');
        $('#footer .footer-dropdown-option > li:eq('+ (index) +')').addClass('on')
      } 
    });

}



  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    });
  }