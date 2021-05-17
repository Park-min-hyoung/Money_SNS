"use strict";

const urlQuery = window.location.search; // url query 조회
const urlParams = new URLSearchParams(urlQuery); // id의 값을 조회하기 위한 준비
const path = urlParams.get('href'); //

const id = document.querySelector("#id"),
 psword = document.querySelector("#psword"),
 loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        psword: psword.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                if (path == 'board'){
                    location.href = "/board?id=" + req.id;
                }
                else{
                    location.href = "/?id=" + req.id; 
                }
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러발생");
        });
}