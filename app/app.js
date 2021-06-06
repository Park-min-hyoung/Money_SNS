"use strict";

// 모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// 라우팅
const home = require("./src/routes/home");
const board = require("./src/routes/home/board");
const log = require("./src/routes/home/log");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use("/", home); // use -> 미들 웨어를 등록해주는 메소드
app.use("/", board);
app.use("/", log);

module.exports = app;