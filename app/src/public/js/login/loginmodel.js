$(document).ready(function () {

  $(function () {
    $("#confirm").click(function () {
      modalClose();
      //컨펌 이벤트 처리
    });
    function modalClose() {
      $("#popup").fadeOut();
    }
  }); screen
  $("#TestBtn").click(function () {

    var input_value1 = $("input[id='userId']").val();
    var input_value2 = $("input[id='password1']").val();

    if (input_value1 != "" && input_value2 != "") 
    {
      $.ajax({
        url: '/loging',
        dataType: 'json',
        type: 'POST',
        data: { data1: input_value1, data2: input_value2 },
        success: function (result) 
        {
          if (result.length > 0) 
          { 
            if(result[0].password == input_value2)
            {
              location.href = "/index";
            }
            else
            {
              $("#erroring").text('아이디나 비밀번호가 달라 로그인이 되질 않습니다.');
              $("#popup").css('display', 'flex').hide().fadeIn();
            }
          }
          else
          {
            $("#erroring").text('아이디나 비밀번호가 달라 로그인이 되질 않습니다.');
            $("#popup").css('display', 'flex').hide().fadeIn();
          }
        },
        error: function (error) {
          if (error) {
            $("#erroring").text('서버 접속 도중 오류가 발생하였습니다.');
            $("#popup").css('display', 'flex').hide().fadeIn();
          }
        }
      })
    }
    else
    {
      $("#popup").css('display', 'flex').hide().fadeIn();
      $("#erroring").val('아이디나 비밀번호를 입력하지 않았습니다.');

    }
  })
});
