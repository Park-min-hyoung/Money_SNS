"use strict";

var pass = document.getElementById('select__img');
var btn = document.getElementsByClassName('section__logo__title');
var like_check = false;
var like_cnt = 3564;

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

// 사진 클릭 시 진행되는 동작들을 다루는 소스코드(사진, 닉네임, 설명글, 좋아요, 화면깨짐 등등)
$('label').on('click', function(){
    // id의 값을 가져와 사진을 출력
    var src = jQuery(this).attr('id');
    jQuery('#profile').attr("src","img/board/" + src + ".jpg");
    // id의 값을 가져와 닉네임 출력
    var nickname = document.getElementById('nickname');
    nickname.innerHTML = '<div style="text-align: left; font-size:25px; margin: 15px 10px;">' + src + '<div>';
    // value 값을 가져와 value의 내용을 출력
    var value = jQuery(this).attr('value');
    var element2 = document.getElementById('introduce');
    element2.innerHTML = value;
    // close시 화면이 깨지는데 사진 클릭시 두개의 label 태그의 id와 value 값을 수정함으로써 보완
    $(".close").attr('id', src);
    $(".close").attr('value', value);
});

// 좋아요(하트) 클릭시 변화
$('.far, .fas').on('click', function(){
    if (!like_check){ // 체크 되지 않았을 때
        $('.like').addClass('selected');
        like_check = true;
        like_cnt += 1;
    } else {
        $('.like').removeClass('selected');
        like_check = false;
        like_cnt -= 1;
    }
    document.getElementById("like_cnt").innerHTML = "좋아요 " + like_cnt + "개";
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

// 페이지 이동 시 값 전달하는 제이쿼리
$('video').on('click', function(){
    // 영상 클릭 시 그 영상의 src 저장
    var video_src = jQuery(this).attr("src");
    localStorage.setItem("storageName", video_src);
    // 닉네임을 넘기기 위해 id 값을 넘김
    var video_nickname = jQuery(this).attr('id');
    localStorage.setItem("storage_video_nickName", video_nickname);
    // 영상 설명 부분을 넘기기 위해 value 값을 넘김
    var video_introduce = jQuery(this).attr('value');
    localStorage.setItem("storage_video_introduce", video_introduce);
    // 영상 제목을 넘기기 위해 name 값을 넘김
    var video_title = jQuery(this).attr('name');
    localStorage.setItem("storage_video_title", video_title);
});

function func() {
    document.getElementsByName("haha").value = "<%= description =>";
    console.log('haha')
}