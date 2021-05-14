"use strict";

const title = document.querySelector("#title"),
 description = document.querySelector("#description"),
 video = document.querySelector("#video"),
 submitBtn = document.querySelector("#button");

submitBtn.addEventListener("click", submit);

function submit() {
    const req = {
        title: title.value,
        description: description.value,
        video: video.value,
    };

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
                location.href = "/board?id=" + req_id;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러발생");
        });
}