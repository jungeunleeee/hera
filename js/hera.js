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

  navigation();
  // header: navigation
  function navigation() {
    // 변수 선언
    document.querySelectorAll('#nav > ul > li > a').forEach(function(el, i) {
      el.addEventListener('mouseover', function() {
        var $selector = document.querySelector('#nav');
        // 자신의 번호를 말해주어야 함
        var index = Array.from(document.querySelectorAll('#nav > ul >  li > a')).indexOf(this);
        console.log(index);
        // 자신에게 해당되는 #nav box를 열어줘야 함.
        $selector.querySelectorAll('ul > li').forEach(function(el, i) {
          el.classList.remove('on');
        });

        // header에 open class 붙여주어야 함.
        $selector.querySelector('ul > li:nth-child('+ (index + 1) + ')').classList.add('on');

      });
    });

  }


});


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}