"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

// 마지막에는 이거를 사용!!!
router.get("/find", ctrl.output.find);
router.get("/join", ctrl.output.join);
router.get("/login2", ctrl.output.login2);
router.get("/member", ctrl.output.member);
router.get("/resign", ctrl.output.resign);
router.get("/resignA", ctrl.output.resignA);
router.get("/terms", ctrl.output.terms);
router.get("/idfind", ctrl.output.idfind);
router.get("/modify", ctrl.output.modify);
router.get("/passwordfind", ctrl.output.passwordfind);

router.get("/finded", ctrl.output.finded);
// router.get("/chat", ctrl.output.chat);

router.post("/finding", ctrl.process.finding);

module.exports = router;