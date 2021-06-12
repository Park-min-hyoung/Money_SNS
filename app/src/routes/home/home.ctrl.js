"use strict";

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    find: (req, res) => {
        res.render("login/find");
    },
    join: (req, res) => {
        res.render("login/join");
    },
    login2: (req, res) => {
        res.render("login/login2");
    },
    member: (req, res) => {
        res.render("login/member");
    },
    resign: (req, res) => {
        res.render("login/resign");
    },
    resignA: (req, res) => {
        res.render("login/resignA");
    },
    terms: (req, res) => {
        res.render("login/terms");
    },
    idfind: (req, res) => {
        res.render("login/idfind");
    },
    modify: (req, res) => {
        res.render("login/modify");
    },
    passwordfind: (req, res) => {
        res.render("login/passwordfind");
    },

    finded: (req, res) => {
        var data1 = req.query.data1;
        var data2 = req.query.data2;
        if (data1 != "" && data2 == "undefined") {
            res.render("login/passwordfind", { data: data1 });
        }
        else {
            res.render("login/idfind", { data: data2 });
        }
    },
}

const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        return res.json(response);
    },
    register: async(req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        return res.json(response);
    },
    finding: async(req, res) => {
        var comand = req.body;
        var phone = comand.data1;
        var mail = comand.data2;
        var memberid = comand.data3;
        var sua = comand.data4;
        var sub = comand.data5;

        console.log(phone);
        console.log(mail);

        if (phone != "" && mail != "" && memberid == "" && sua == "00" && sub == "") {
            connection.query("SELECT memberid FROM member WHERE mail =? AND phone =?", [mail, phone], function (err, data) {
                if (data.length != 0) {
                    if (err) {
                        console.log('user infor is:', err);
                    }
                    else {
                        console.log("귀하의 아이디는 :", data[0].memberid);
                        res.json(data);
                    }
                }
                else {
                    console.log('귀하의 조건에 맞는 아이디가 존재하지 않습니다.');
                    res.json(data);
                }
            });
        }
        else if (phone == "" && mail == "" && memberid != "" && sua != "00" && sub != "") {
            connection.query("SELECT password FROM member WHERE memberid =? AND passwordfind =? AND passwordanswer =?", [memberid, sua, sub], function (err, data) {


                if (data.length != 0) {
                    if (err) {
                        console.log('user infor is:', err);
                    }
                    else {
                        console.log("귀하의 아이디는 :", memberid);
                        console.log("그에 맞는 귀하의 비밀번호는", data[0].password);
                        res.json(data);
                    }
                }
                else {
                    console.log('회원 정보에 없는 아이디이거나, 비밀번호 찾기와 답이 틀립니다.');
                    res.json(data);
                }

            });
        }
    },
};

module.exports = {
    output,
    process,
};