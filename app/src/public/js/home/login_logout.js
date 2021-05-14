const urlQuery = window.location.search; // url query 조회
const urlParams = new URLSearchParams(urlQuery); // id의 값을 조회하기 위한 준비
var req_id = urlParams.get('id'); // id 값으로 초기화
var img_num = urlParams.get('n');

if (req_id !== null) { // 페이지 이동시 id를 넘겨줘야 로그인이 유지된다.
    $(".header__logo__wrap a").attr("href", "/?id=" + req_id);
    $("#link_board").attr("href", "/board?id=" + req_id);
    $('#upload').css('display', 'block');
    $("#upload").attr("href", "/upload?id=" + req_id);
    $("#txt_upload").attr("href", "/txt_upload?id=" + req_id);
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