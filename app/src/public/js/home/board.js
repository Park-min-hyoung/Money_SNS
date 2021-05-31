"use strict";

var pass = document.getElementById('select__img');
var btn = document.getElementsByClassName('section__logo__title');

function selectImg(number) {
    pass.style.display = "none";

    if(number == 1){
        pass = document.getElementById('select__img');
        if (req_id != null){
            $('#photo_upload').css('display', 'block');
            $('#video_upload').css('display', 'none');
        }
    }
    else if(number == 2){
        pass = document.getElementById('select__video');
        if (req_id != null){
            $('#video_upload').css('display', 'block');
            $('#photo_upload').css('display', 'none');
        }
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
    location = '/board?id=' + id;
});

// 유튜브 자동재생
// $(document).ready(function() {
// 	$('.pre_video')
//     .mouseover(function() {
//         $(this).find('.video_img').hide();
//         var myVid = $(this).attr('target');
//         $(myVid).show().trigger('play');
// 	 })
// 	 .mouseout(function() {
//       $(this).find('.video_img').show()
//       $('video').trigger('pause').hide()
//       $('video').prop('currentTime', 0);
// 	 })
// });

var title = document.getElementById('nickname').innerHTML;
var like_check = document.getElementById("like_cnt").getAttribute('name');
var id = document.getElementById("like_cnt").className;
var seq = document.getElementById("for_like").getAttribute('name');

// 사진 또는 영상 클릭 시 like_check가 1또는 3이면 꽉찬 하트 아니면 빈 하트
if (like_check == 1){
    $('.like').addClass('selected');
}
else if (like_check == 0) {
    $('.like').removeClass('selected');
}
else if (like_check == 3){
    $('.video_like').addClass('selected');
}
else {
    $('.video_like').removeClass('selected');
}

// 좋아요(하트) 클릭시 변화
$('.far, .fas').on('click', function(){
    if (like_check == 0){ // 체크 되지 않았을 때
        location = "/board/" + title + "?id=" + id + "&n=" + seq + "&like=1";
    } 
    else if(like_check == 1) {
        location = "/board/" + title + "?id=" + id + "&n=" + seq + "&like=0";
    }
    else if(like_check == 2) {
        location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&like=3";
    }
    else{
        location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&like=2";
    }
});
// 사진창에서 신고 클릭 시 DB에 카운터
$('#photo_declaration').on('click', function(){
    var declaration_text = prompt("어떠한 사유로 신고하시는지 자세히 적어주세요");
    location = "/board/" + title + "?id=" + id + "&n=" + seq + "&declaration=" + declaration_text;
});
// 영상에서 신고 클릭 시 DB에 카운터
$('#video_declaration').on('click', function(){
    var declaration_text = prompt("어떠한 사유로 신고하시는지 자세히 적어주세요");
    location = "/board_video/" + title + "?id=" + id + "&n=" + seq + "&declaration=" + declaration_text;
});
// 사진에서 게시물 삭제 버튼을 눌렀을때
$('#photo_delete').on('click', function(){
    location = "/board?id=" + id + "&seq=" + seq + "&delete=photo_delete";
});
// 영상에서 게시물 삭제 버튼을 눌렀을 때
$('#video_delete').on('click', function(){
    location = "/board?id=" + id + "&seq=" + seq + "&delete=video_delete";
});

var upload_id = document.getElementById("video_nickname").getAttribute('name');

if (upload_id == req_id) { // 자신이 업로드한 사진이나 영상만 삭제 버튼이 보인다
    if (contents == "_"){
        document.getElementById('video_delete').style.display = "block";
    } else {
        document.getElementById('Photo_delete').style.display = "block";
    }
}

// 사진에서 댓글 삭제 버튼을 눌렀을 때
function photocommentDelete(delete_seq) {
    location = "/board/" + title + "/?id=" + id + "&n=" + seq + "&comment_delete_seq=" + delete_seq;
}
// 사진에서 댓글 수정 버튼을 눌렀을 때
function photocommentUpdate(update_seq) {
    var update_comment_text = prompt("댓글 수정");
    if (update_comment_text !== null && update_comment_text !== "") {
        location = "/board/" + title + "/?id=" + id + "&n=" + seq + "&comment_update_seq=" + update_seq + "&update_comment=" + update_comment_text;    }
}
// 영상에서 댓글 삭제 버튼을 눌렀을 때
function videocommentDelete(delete_seq) {
    location = "/board_video/" + title + "/?id=" + id + "&n=" + seq + "&comment_delete_seq=" + delete_seq;
}
// 영상에서 댓글 수정 버튼을 눌렀을 때
function videocommentUpdate(update_seq) {
    var update_comment_text = prompt("댓글 수정");
    if (update_comment_text !== null && update_comment_text !== "") {
        location = "/board_video/" + title + "/?id=" + id + "&n=" + seq + "&comment_update_seq=" + update_seq + "&update_comment=" + update_comment_text;
    }
    
}