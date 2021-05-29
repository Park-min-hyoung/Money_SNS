const urlQuery = window.location.search; // url query 조회
const urlParams = new URLSearchParams(urlQuery); // id의 값을 조회하기 위한 준비
const req_id = urlParams.get('id'); // id 값으로 초기화
const req_extension = urlParams.get('extension'); // id 값으로 초기화
const contents = window.location.pathname[6]; // video 페이지 인지 video_board 페이지인디 _를 통해 구분
const contents_num = urlParams.get('n'); // video 페이지 인지 video_board 페이지인디 _를 통해 구분

if (req_id !== null) { // 페이지 이동시 id를 넘겨줘야 로그인이 유지된다.
    $(".header__logo__wrap a").attr("href", "/?id=" + req_id);
    $("#link_board").attr("href", "/board?id=" + req_id);
    $('#photo_upload').css('display', 'block');
    $('#photo_delete').css('display', 'block');
    $("#photo_upload").attr("href", "/upload?id=" + req_id + "&extension=img");
    $("#video_upload").attr("href", "/upload?id=" + req_id + "&extension=mp4");
}

window.onload = function() { // id의 value를 통해 Login 하면 Logout 뜨게하기
    if(req_id !== null) {
        document.getElementById("login__wrap").style.display = 'none';
        document.getElementById("logout__wrap").style.display = 'flex';
    }
    else {
        document.getElementById("login__wrap").style.display = 'flex';
        document.getElementById("logout__wrap").style.display = 'none';
    }

    $("#popup").attr("checked", true);
}