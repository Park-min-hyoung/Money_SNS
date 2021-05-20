"use strict";

const video_plusBtn = document.querySelector("#plus_video_btn"),
 upload_videofile = document.querySelector("#file1"),
 photo_plusBtn = document.querySelector("#plus_photo_btn"),
 upload_photofile = document.querySelector("#file2");

video_plusBtn.addEventListener("click", videoPlus);
photo_plusBtn.addEventListener("click", photoPlus);

function videoPlus() {
    const file = upload_videofile.files[0];
    const formData = new FormData();
    formData.append('upload', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/upload?id=" + req_id + "&extension=" + req_extension;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // 애러 발생시 적을것 들
        });
}

function photoPlus() {
    const file = upload_photofile.files[0];
    const formData = new FormData();
    formData.append('upload', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/txt_upload?id=" + req_id + "&extension=" + req_extension;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // 애러 발생시 적을것 들
        });
}

if (req_extension === "mp4") { // 영상 업로드 화면에 들어오면 숨겨져 있던것 출력
    document.getElementById("mp4").style.display = "block";
    document.getElementById("plus_photo_btn").innerText = "썸네일용 사진 추가";
}