// hera Common JS
$(document).ready(function () {
  preventDefaultAnchor();
  scrollEvent();
  setImageSlide('#main-visual div.image-box', 1, true, 5000);
  setBannerSlide('div.banner-slide:eq(0)', 1);
  navigation();
  footerToggleButton();
  footerDropdown();
  footerLanguage();
  // footerLanguagePc();
  resizeWindow();

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

function setImageSlide(selector, first, status, speed) {
  $(selector).each(function () {
    var $selector = $(this);
    var numSlide = $selector.find('ul.image-slide > li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var timerId = '';
    var timerSpeed = speed;
    var isTimerOn = status;
    var onAnimation = false;


    if (isTimerOn === true) {
      $selector.find('div.small-box a.play').addClass('on');
    } else {
      $selector.find('div.small-box a.play').removeClass('on');
    }
    showSlide(slideFirst);

    $selector.find('.indicator li a').on('click', function () {
      var index = $selector.find('.indicator li').index($(this).parent());
      showSlide(index + 1);
    });

    $selector.find('.image-slide li a').on('focus', function () {
      var index = $selector.find('.image-slide li').index($(this).parent());
      $selector.find('div.box').scrollLeft(0);
      showSlide(index + 1);
    });

    $selector.find('.control a.prev').on('click', function () {
      $(this).find('img').stop(true).animate({
        'left': '-10px'
      }, 30).animate({
        'left': '0px'
      }, 100);
      showSlide(slidePrev);
    });

    $selector.find('.control a.next').on('click', function () {
      $(this).find('img').stop(true).animate({
        'right': '-10px'
      }, 30).animate({
        'right': '0px'
      }, 100);
      showSlide(slideNext);
    });

    $selector.find('div.small-box a.play').on('click', function () {
      if (isTimerOn === true) {
        stopTimer();
      } else {
        startTimer();
      }
    });


    function startTimer() {
      timerId = setTimeout(function () {
        showSlide(slideNext);
      }, timerSpeed);
      $selector.find('div.small-box a.play').addClass('on');
      isTimerOn = true;
    }

    function stopTimer() {
      clearTimeout(timerId);
      $selector.find('div.small-box a.play').removeClass('on');
      isTimerOn = false;
    }

    function resetTimer() {
      clearTimeout(timerId);
      if (isTimerOn === true) {
        timerId = setTimeout(function () {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }

    function showSlide(n) {
      if (slideNow === n || onAnimation === true) return false;
      resetTimer();

      if (slideNow === 0) {
        $selector.find('.image-slide li:eq(' + (n - 1) + ')').addClass('on');
      } else {
        onAnimation = true;
        $selector.find('.image-slide li:eq(' + (slideNow - 1) + ')').removeClass().addClass('hide').one('animationend', function () {
          $(this).removeClass();
          onAnimation = false;
        });
        $selector.find('.image-slide li:eq(' + (n - 1) + ')').addClass('show');
      }
      $selector.find('div.text > div.box').removeClass('on');
      $selector.find('div.text > div.box:eq(' + (n - 1) + ')').addClass('on');
      $selector.find('.indicator li').removeClass('on');
      $selector.find('.indicator li:eq(' + (n - 1) + ')').addClass('on');
      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);
      console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    }

  });
}

function setBannerSlide(selector, first) {
  var $selector = $(selector);
  var numBanner = 0;
  var bannerNow = first;
  var bannerPrev = 0;
  var bannerNext = 0;
  var offsetLeft = 0;
  var widthBox = 0;
  var widthBar = 0;
  var offsetLeftMin = 0;
  var loadCounter = 0;
  var bounceTimerId = '';

  $selector.find('.banner > li img').on('load', function () {
    loadCounter++;
    if (loadCounter === $selector.find('.banner > li').length) {
      setStatus();
    }
  });

  $selector.find('.control a.prev').on('click', function () {
    showBanner(bannerPrev);
  });

  $selector.find('.control a.next').on('click', function () {
    showBanner(bannerNext);
  });

  $(window).on('resize', function () {
    clearTimeout(bounceTimerId);
    bounceTimerId = setTimeout(function () {
      setStatus();
    }, 100);
  });

  function showBanner(n) {
    offsetLeft = -$selector.find('.banner > li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft < offsetLeftMin) {
      offsetLeft = offsetLeftMin;
      $selector.find('.control a.next').css({
        'display': 'none'
      });
    } else {
      $selector.find('.control a.next').css({
        'display': 'block'
      });
    }
    $selector.find('.banner').css({
      'transition': 'left 0.3s',
      'left': offsetLeft + 'px'
    });

    if (offsetLeft === 0) {
      $selector.find('.control a.prev').css({
        'display': 'none'
      });
    } else {
      $selector.find('.control a.prev').css({
        'display': 'block'
      });
    }


    // 번호표시
    bannerNow = n;
    bannerPrev = (n === 1) ? 1 : (n - 1);
    bannerNext = (n === numBanner) ? numBanner : (n + 1);

  }

  setStatus();

  function setStatus() {
    widthBox = $selector.find('.box').innerWidth();
    widthBar = 0;
    $selector.find('.banner > li').each(function () {
      widthBar += $(this).outerWidth(true);
    });
    offsetLeftMin = widthBox - widthBar;
    $selector.find('.banner').css({
      'width': (widthBar + 5) + 'px'
    });

    // last
    $selector.find('.banner > li').each(function (i) {
      if (-$(this).position().left <= offsetLeftMin) {
        numBanner = i + 1;
        return false;
      }
    });

    if (numBanner < bannerNow) bannerNow = numBanner;
    showBanner(bannerNow);

    if (offsetLeftMin === 0) {
      $selector.find('.control a.prev').css({
        'display': 'none'
      });
    }
  }

}

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
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
  console.log(height);

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
        'height': 0 + 'px'
      });
    }
  });

}

function footerDropdown() {
  var windowWidth = $(window).width();

  if (windowWidth >= 1024) {
    $('#footer button.footer-dropdown-selector').on('click', function () {
      $(this).toggleClass('open');
      $('#footer ul.footer-dropdown-option').toggleClass('open');
    });
  }
  $('#footer button.footer-dropdown-selector').on('click', function () {
    var height = $('#footer .footer-inner').outerHeight();
    $(this).toggleClass('on');
    var sumHeight = 0;

    $('#footer ul.footer-dropdown-option > li > a').each(function () {
      sumHeight += $(this).outerHeight(true);
      console.log(sumHeight + '감자감자');
    });
    if ($(this).hasClass('on') === true) {
      console.log(sumHeight + '성공');
      $('#footer div.more-footer').css({
        'height': (height + sumHeight) + 'px'
      });
    } else {
      $('#footer div.more-footer').css({
        'height': (height - sumHeight) + 'px'
      });
    }
    $('#footer .footer-dropdown-option').toggleClass('on');
  });


}

function footerLanguage() {
  $('#footer .footer-dropdown-option > li > a').on('click', function () {
    $this = $(this);
    if ($('#footer > section').hasClass('mobile')) {
      var index = $('#footer ul.footer-dropdown-option > li').index($this.parent());
      $('#footer .footer-dropdown-option > li').removeClass('on');
      $('#footer .footer-dropdown-option > li:eq(' + (index) + ')').addClass('on')
    }
  });
}



function resizeWindow() {
  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth >= 1024) {
      $('#footer button.footer-toggle-button').removeClass('on');
      $('#footer .more-footer').removeAttr('style');
      $('#footer section.mobile .footer-dropdown-option').removeClass('on');
      $('#footer section.mobile  .footer-dropdown-selector').removeClass('on');
      $('#footer section.mobile  .footer-dropdown-option > li').removeClass('on');
    } else {
      $('#footer button.footer-toggle-button').removeClass('on');
      $('#footer .more-footer').removeAttr('style')
      $('#footer section.pc .footer-dropdown-option').removeClass('on');
      $('#footer section.pc  .footer-dropdown-selector').removeClass('on');
      $('#footer section.pc  .footer-dropdown-option > li').removeClass('on');
    }
  });
}


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}