"use strict";

var like_check = 0;
var like_cnt = 3564;

// 저장된 src를 통해 영상 재생
window.onload = function(){
    if(req_id !== null) { // 다시 켜지면 이 소스가 무효화 된다
        document.getElementById("login__wrap").style.display = 'none';
        document.getElementById("logout__wrap").style.display = 'flex';
    }
    else {
        document.getElementById("login__wrap").style.display = 'flex';
        document.getElementById("logout__wrap").style.display = 'none';
    }

    $("#play_video").attr("src", localStorage.getItem("storageName"));
    $("#play_video").show().trigger('play');

    // 영상 클릭 시 영상제목, 닉네임 및 영상 설명 글 출력
    document.getElementById("video_nickname").innerHTML = localStorage.getItem("storage_video_nickName");
    document.getElementById("video_introduce").innerHTML = localStorage.getItem("storage_video_introduce");
    document.getElementById("video_title").innerHTML = localStorage.getItem("storage_video_title");
}

// video 좋아요(하트) 클릭시 변화
$('.video_like i').on('click', function(){
    if (like_check == 0){
        $(".video_like").addClass('selected');
        like_check = 1;
        like_cnt += 1;
    } else {
        $(".video_like").removeClass('selected');
        like_check = 0;
        like_cnt -= 1;
    }
    document.getElementById("like_cnt").innerHTML = "좋아요 " + like_cnt + "개";
});