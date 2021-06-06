"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/find", ctrl.output.find);
router.get("/join", ctrl.output.join);
router.get("/login2", ctrl.output.login2);
router.get("/member", ctrl.output.member);
router.get("/resign", ctrl.output.resign);
router.get("/resignA", ctrl.output.resignA);
router.get("/terms", ctrl.output.terms);

router.get("/chat", ctrl.output.chat);

module.exports = router;