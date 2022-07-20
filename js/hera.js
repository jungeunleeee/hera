// hera Common JS
$(document).ready(function () {
  preventDefaultAnchor();

  // header: scrollevent
  document.addEventListener('scroll', function () {
    // 변수 선언
    var scrollLocation = document.documentElement.scrollTop; //현재 스크롤바 위치
    var element = document.getElementById('header');

    // method: scrollTop이 0이라면 open 떼고 아니면 붙이기
    if(scrollLocation === 0) {
      element.classList.remove('open');
    } else {
      element.classList.add('open');
    }
  });

  // 함수 실행
  navigation();

  // header: navigation
  function navigation() {
    document.querySelectorAll('#nav > ul > li > a').forEach(function(el, i) {

      // event: mouseover
      el.addEventListener('mouseover', function() {
        // 변수 선언
        
        var index = Array.from(document.querySelectorAll('#nav > ul > li > a')).indexOf(this);
        console.log(index);

        // 이벤트1 : 해당하는 box보여주기
        document.querySelectorAll('#nav > ul > li').forEach(function(el, i) {
          el.classList.remove('on');
        });
        document.querySelector('#nav > ul > li:nth-child('+ (index + 1) +')').classList.add('on');
        // header의 높이 줄이기
        document.querySelector('header#header').classList.add('open');
      });


      // // event: mouseleave :: 마우스가 nav tag밖으로 나가면 취소
      document.querySelector('#nav').addEventListener('mouseleave', function() {
        document.querySelectorAll('#nav > ul > li').forEach(function(el, i) {
          el.classList.remove('on');
        });
        // header 그대로
        document.querySelector('header#header').classList.remove('open');
      });
    });
  }


  // main-visual: ImageSlide
    // 변수 선언
    var $selector = document.querySelector('#main-visual div.image-slide');
    var numSlide = $selector.querySelectorAll('ul.image-slide > li').length;
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var slideFirst = 1;
    var timerId = '';
    var timerSpeed = 2000;
    var isTimerOn = true;

    // 메소드 
    $selector.querySelectorAll('ul.image-slide > li').forEach(function(el, i) {
      el.setAttribute('style', 'left: ' + (i * 100) + '%; display: block');
    });
    if(isTimerOn === true) {
      $selector.querySelector('.small-box div.play').setAttribute('class', 'play on');
    } else {
      $selector.querySelector('.small-box div.play').setAttribute('class', 'play');
    }

    showSlide(slideFirst);



    $selector.querySelectorAll('.indicator > li > a').forEach(function(el, i) {
      el.addEventListener('click', function() {
        var index = Array.from($selector.querySelectorAll('.indicator> li > a')).indexOf(this);
        alert(index);
      }, false);
    });

    $selector.querySelector('.control > a.prev').addEventListener('click', function() {
      showSlide(slidePrev);
    }, false);

    $selector.querySelector('.control > a.next').addEventListener('click', function() {
      showSlide(slideNext);
    }, false);

    $selector.querySelector('.small-box div.play').addEventListener('click', function() {
      if(isTimerOn === true) {
        stopTimer();
      } else {
        startTimer();
      }
    }, false);

    function startTimer () {
      timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
      $selector.querySelector('.small-box div.play').classList.add('on');
      isTimerOn = true;
    }

    function stopTimer() {
      clearTimeout(timerId);
      $selector.querySelector('.small-box div.play').classList.remove('on');
    }

    function resetTimer() {
      clearTimeout(timerId);
      if(isTimerOn === true) {
        timerId = setTimeOut(function() {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }
    // 함수정의
    function showSlide(n) {
      resetTimer();
      $selector.querySelector('ul.image-slide').setAttribute('style', 'transition: 0.3s; left: ' + (-(n-1)*100) + '%');

      // indicator 정리
      $selector.querySelectorAll('.indicator > li').forEach(function(el, i) {
        el.classList.remove('on');
      });
      $selector.querySelector('.indicator > li:nth-child('+ n + ')').classList.add('on');

      // 현재 슬라이드 번호 저장
      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1: (n + 1);
    }

});


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}