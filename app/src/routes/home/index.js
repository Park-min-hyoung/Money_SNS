"use strict";

const express = require("express");
const router = express.Router();

const multer  = require('multer')

var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/Park/Desktop/고민/4학년 1학기/종설/Money_SNS/img/board');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})
const upload = multer({ storage: _storage })

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/upload", ctrl.output.upload);
router.get("/txt_upload", ctrl.output.txt_upload);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
// 사용자가 post 방식으로 전달한 데이터가 업로드라는 디렉토리로 향하고 있다면 ctrl에 소스코드가 실행 될것이다.
// 두번째 파라미터는 파일을 가공해서 req 객체에 파일이라는 프로퍼티를 암시적으로 추가함
router.post("/upload", upload.single('userfile'), ctrl.process.upload);

module.exports = router;