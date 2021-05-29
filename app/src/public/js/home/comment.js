"use strict";

const comment = document.querySelector("#comment"),
 commentBtn = document.querySelector("#comment_button");

commentBtn.addEventListener("click", submitComment);

function submitComment() {
    const req = {
        comment: comment.value,
    };
    
    fetch("/board/:id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/board/이수/?id=" + req_id + "&n=" + contents_num;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러발생");
        });
}