"use strict";

var pass = document.getElementById('select__img');
var btn = document.getElementsByClassName('section__logo__title');
var like_check = false;
var like_cnt;
var title = document.getElementById('nickname').innerHTML;

function selectImg(number) {
    pass.style.display = "none";

    if(number == 1){
        pass = document.getElementById('select__img');
    }
    else if(number == 2){
        pass = document.getElementById('select__video');
    }
    pass.style.display = "flex";
}

// 사진 또는 비디오 항목 선택 시 글자 색상 변경
$('.section__logo').on('click', function(){
    $('.section__logo').removeClass('selected');
    $(this).addClass('selected');
});

// 모달 취소 또는 바깥 화면 누르면 board로 이동
$('label').on('click', function(){
    location = '/board';
});

// 좋아요(하트) 클릭시 변화
$('.far, .fas').on('click', function(){
    if (!like_check){ // 체크 되지 않았을 때
        $('.like').addClass('selected');
        like_check = true;
        location = "/board/" + title + "?like=1";
    } else {
        $('.like').removeClass('selected');
        like_check = false;
        location = "/board/" + title + "?like=0";
    }
    //document.getElementById("like_cnt").innerHTML = "좋아요 " + like_cnt + "개";
});

// 유튜브 썸네일
$(document).ready(function() {
	$('.pre_video')
    .mouseover(function() {
      $(this).find('.video_img').hide();
      var myVid = $(this).attr('target');
      $( myVid ).show().trigger('play');
	 })
	 .mouseout(function() {
      $(this).find('.video_img').show()
      $('video').trigger('pause').hide()
      $('video').prop('currentTime', 0);
	 })
});