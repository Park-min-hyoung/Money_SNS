const urlQuery = window.location.search; // url query 조회
const urlParams = new URLSearchParams(urlQuery); // id의 값을 조회하기 위한 준비
var req_id = urlParams.get('id'); // id 값으로 초기화

// if (req_id !== null) { // Login인 중일 때 다른 페이지로 이동 시 url 수정
//     $(".header__logo__wrap a").attr("href", "http://127.0.0.1:5501/index.html?id=" + req_id);
// }

window.onload = function() { // id의 value를 통해 Login 하면 Logout 뜨게하기
    if(req_id !== null) {
        document.getElementById("login__wrap").style.display = 'none';
        document.getElementById("logout__wrap").style.display = 'flex';
    }
    else {
        document.getElementById("login__wrap").style.display = 'flex';
        document.getElementById("logout__wrap").style.display = 'none';
    }
}