$(function () {
  mainInit();
  $(document).on('click', 'a[href="#"]', function (e) { e.preventDefault() })
})

function mainInit() {
  gnb_menu();
  main_banner();
  manage();
}

//메뉴
function gnb_menu() {
  let $header = $('#header');
  let $gnbli = $('#header .nav .gnb > li');
  let $subul = $('#header .nav .gnb > li > ul');

  $gnbli.hover(function(){
    $subul.hide();
    $(this).find('ul').show();
    $gnbli.removeClass('on');
    $(this).addClass('on');
  })
  $header.on('mouseleave',function(){
    $subul.stop().slideUp(300);
    $gnbli.removeClass('on');
  })
}

function main_banner() {
  let $mainLi = $('#banner .main-banner li');
  let $pagingLi = $('#banner .paging .paging-bar li');
  let $pause = $('#banner .paging p.pause');
  let current = 0, old = 0, size = $mainLi.length, timer = null, interval = 6000, isplay = true;

  timer = setInterval(make, interval);
  function make() {
    current++;
    if (current > size - 1) {
      current = 0;
    }
    banner('100%', '-100%');
  }

  $pagingLi.on('click', function () {
    current = $(this).index();
    if (current != old) {
      banner('100%', '-100%');
    }
    clearInterval(timer);
    timer = setInterval(make, interval);
  })

  $pause.on('click', function () {
    isplay ? clearInterval(timer) : timer = setInterval(make, interval);
    isplay = !isplay
  })

  function banner(start, end) {
    $mainLi.eq(current).css({ left: start }).animate({ left: 0 }, 400);
    $mainLi.eq(old).css({ left: 0 }).animate({ left: end }, 400);

    $mainLi.removeClass('on');
    $mainLi.eq(current).addClass('on');

    $pagingLi.removeClass('on');
    $pagingLi.eq(current).addClass('on');

    old = current;
  }
}

function manage(){
  let $manageLi = $('.main .manage .manage-list ul li');
  let $manageInfo = $('.main .manage .manage-info ul li');
  let $manageImg = $('.main .manage .manage-img ul li');
  let cnt = 0;



  $manageLi.on('click',function(){
    cnt = $(this).index();
    $manageInfo.hide().eq(cnt).show();
    $manageImg.removeClass('on');
    $manageImg.eq(cnt).addClass('on');
    $manageLi.removeClass('on');
    $manageLi.eq(cnt).addClass('on')
  })
}

