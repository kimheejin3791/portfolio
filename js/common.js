$(document).ready(function() {
    var $snb = $("#snb")
    //메뉴열기 클릭
  $('.btn').on('click', function () {
    if ($(this).hasClass('active')) { //닫기
      $snb.stop().animate({right: -200}, 300, function () {
        $(this).css({visibility: 'hidden'}).find('ul li.on').removeClass('on').children('ul').stop().slideUp();
      });

      $(this).removeClass('active').find('sr-only').text('메뉴 열기');
    } else {    //열기
      $(this).addClass('active').find('sr-only').text('메뉴 닫기');

      //가정처음과 마지막에서 #gnb 외부로 포커스가 나가지 않도록 제어
      var $first = $snb.find('[data-link="first"]');
      var $last = $snb.find('[data-link="last"]');

      $snb.css({visibility: 'visible'}).stop().animate({right: 0}, 300, function () {
        $first.focus();   //대상 엘리먼트에 포커스를 강제로 이동
      });

      //첫번째 a 태그에서 shift+tab을 눌러 header의 영역으로 포커스가 이동하지 못하게 제한
      $first.on('keydown', function (e) {
        console.log(e.keyCode);   //tab을 클릭하면 9를 반환
        if ( e.shiftKey && e.keyCode == 9) {
          e.preventDefault();   //포커스 이동을 강제로 제한
          $last.focus();        //처음 포커스로 이동, #gnbWrap을 벗어나지 않고 순환됨
        }
      });
      //마지막 버튼 태그에서 tab을 눌러 container의 영역으로 포커스가 이동하지 못하게 제한
      $last.on('keydown', function (e) {
        if ( !e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          $('.btn_menu').focus();
        }
      });

    }

    //depth1 a click
    $snb.find('>ul>li>a').on('click', function () {
      if ($(this).next().size() == 0) {	//depth1 <a>만 있는 경우
        //console.log($(this).next().size());
        location.href=$(this).attr("href");
      }else {								//depth2 <ul>도 있는 경우
        //console.log($(this).next().size());
        $(this).next().stop().slideToggle("fast").parent().toggleClass('on');
      }

      return false;
    });
  });
});