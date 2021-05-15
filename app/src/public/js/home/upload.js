"use strict";

const plusBtn = document.querySelector("#plus_btn"),
 upload_file = document.querySelector("#file");

plusBtn.addEventListener("click", plus);

function plus() {
    const file = upload_file.files[0];
    const formData = new FormData();
    formData.append('upload', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/txt_upload?id=" + req_id;
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            // 애러 발생시 적을것 들
        });
}