"use strict";

const title = document.querySelector("#title"),
 des = document.querySelector("#des"),
 submitBtn = document.querySelector("#button");

submitBtn.addEventListener("click", submit);

function submit() {
    const req = {
        title: title.value,
        des: des.value,
    };
    console.log(req);
    alert('hi');

    fetch("/txt_upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "http://127.0.0.1:5501/board.html?id=";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러발생");
        });
}