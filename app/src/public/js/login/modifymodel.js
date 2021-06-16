$(document).ready(function () 
{
  var input_value01 = $("input[id='userId']").val();
  var input_value02 = $("input[id='password1']").val();
  var input_value04 = $("input[id='nickname']").val();
  var input_value05 = $("input[id='mail']").val();
  var input_value06 = $("input[id='mobile']").val();
  var input_value07 = $("select[name ='suba']").val();
  var input_value08 = $("input[id='subb']").val(); // 처음 시작했을 때 시작 값을 모든 데이터의 값을 뽑아둔다.

  $(function () {
    $("#confirm").click(function () {
      modalClose();
      //컨펌 이벤트 처리
    });
    function modalClose() {
      $("#popup").fadeOut();
    }
  }); screen
  $("#ModifyBtn").click(function () {

    var input_value1 = $("input[id='userId']").val();
    var input_value2 = $("input[id='password1']").val();
    var input_value3 = $("input[id='password2']").val();
    var input_value4 = $("input[id='nickname']").val();
    var input_value5 = $("input[id='mail']").val();
    var input_value6 = $("input[id='mobile']").val();
    var input_value7 = $("select[name='suba']").val();
    var input_value8 = $("input[id='subb']").val();


    if (input_value1 != input_value01 || input_value2 != input_value02 || input_value4 != input_value04 || input_value5 != input_value05 || input_value6 != input_value06 && input_value7 != input_value07 && input_value8 != input_value08) {
      if (input_value1 != "" && input_value2 != "" && input_value3 != "" && input_value4 != "" && input_value5 != "" && input_value6 != "" && input_value7 != "" && input_value8 != "") {
        if (input_value2 == input_value3) {
          $.ajax({
            url: '/modfiy-save',
            dataType: 'json',
            type: 'POST',
            data: { memberid: input_value1, password: input_value2, nickname: input_value4, mail: input_value5, mobile: input_value6, passwordfind: input_value7, passwordanswer: input_value8 },
            success: function (result) {

              $("#erroring").text('회원정보가 변경되었으므로 로그아웃하겠습니다.');
              $("#popup").css('display', 'flex').hide().fadeIn();
              location.replace('/loginout');
            },
            error: function (error) {
              if (error) {
                $("#erroring").text('첫번째 서버 접속 도중 오류가 발생하였습니다.');
                $("#popup").css('display', 'flex').hide().fadeIn();
              }
            }
          })
        }
        else {
          $("#erroring").text('비밀번호와 비밀번호 확인의 값이 달라 수정이 불가능합니다.');
          $("#popup").css('display', 'flex').hide().fadeIn();
        }
      }
      else {
        $("#erroring").text('하나 이상의 값을 입력하지 않으셨습니다.');
        $("#popup").css('display', 'flex').hide().fadeIn();
      }
    }
    else {

      $("#erroring").text('변경된 값이 없습니다.');
      $("#popup").css('display', 'flex').hide().fadeIn();
    }
  })
});
