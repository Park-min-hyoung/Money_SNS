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
        if (req.session.user) {
            console.log(req.session.user_id);
            connection.query('SELECT * FROM member WHERE memberid = ?', [req.session.user_id], function (error, data) 
            {


                if (data.length > 0) {
                    if (error) {
                        console.log('user infor is:', error);
                    }
                    else {
                        console.log("귀하의 아이디는 :", data[0].memberid);
                        res.render('modify.ejs', { 'data': data }, function (err, html) {
                            if (err) {
                                console.log(err);
                            }
                            res.end(html);
                        })
                    }
                }
                else 
                {
                    console.log('데이터 베이스에 오류 발생');
                    msg.info("오류가 발생하였습니다. 로그아웃합니다.")
                    res.redirect('/loginout');
                }
            });


        }
        else {
            console.log("session is not finded")
            console.log('로그인 정보가 없어, 회원정보를 수정할 수 없습니다.');
            res.redirect('/login');
        }
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
    membered: (req, res) => {
        var data = req.query.data;
        res.render('member.ejs', { data: data });
    },
    loginout: (req, res) => {
        console.log("clear cookie");
        if (req.session.user) {
            req.session.destroy(function (err) 
            {
                if (err) 
                {
                    console.log('세션 삭제시 오류 발생함');
                    return;
                }
                console.log("회원이 로그아웃하였습니다.");
                res.redirect("/index");
            });
        }
        else {
            console.log('로그인이 되어있지 않음');
            res.redirect('/login');
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
    nickcheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.nickCheck();

        return res.json(response);
    },
    usercheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.idCheck();

        return res.json(response);
    },
    docheck: async(req, res) => {
        const user = new User(req.body);
        const response = await user.mailphoneCheck();

        return res.json(response);
    },
    member: async(req, res) => {
        const user = new User(req.body);
        const response = await user.idnickCheck();

        return res.json(response);
    },
    member2: async(req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        if (response === true) {
            res.redirect("login/member");
        }
    },
    modfiysave: async(req, res) => {
        var comand = req.body;
        var memberid = comand.memberid;
        var password = comand.password;
        var nickname = comand.nickname;
        var phone = comand.mobile;
        var email = comand.mail;
        var sua = comand.passwordfind;
        var sub = comand.passwordanswer;

        console.log(memberid,password, nickname, email, phone, sua, sub);
            var sql = 'UPDATE member SET password=?, nickname=?,  mail=?, phone=?, passwordfind=?, passwordanswer=? WHERE memberid =?';
            var params = [password, nickname, email, phone, sua, sub, memberid];
            connection.query(sql, params, function (err, data) 
            {
                if (err) 
                {
                    console.log(err);
                    msg.info("시스템에 오류가 생겨 수정하기 전으로 되돌아갑니다.")
                    res.redirect('/modify');

                }
                else 
                {
                    console.log(Object.keys(data).length);
                    res.json(data);
                }
            });
    },
    loging: async(req, res) => {
        var comand = req.body;
        var memberid = comand.data1;
        var password = comand.data2;

        connection.query('SELECT * FROM member WHERE memberid = ?', [memberid], function (error, data) {

            if (error) {
                console.log("err ocurred", error);
            }
            else {

                if (req.session.user) 
                {
                    res.send("<h1>또 오실려고요?</h1>");
                }
                else {


                    if (data.length > 0) {
                        if (data[0].password == password) 
                        {
                            req.session.user = req.body;
                            req.session.user_id = req.body.data1;
                            req.session.user.expire = new Date();
                            console.log("The solution is :", data)
                            console.log("로그인에 성공하였습니다.");
                            res.json(data);
                        }
                        else {
                            console.log("비밀번호가 다릅니다.");
                            res.json(data);
                        }
                    }
                    else {
                        console.log("아이디가 정확하지 않습니다.");
                        res.json(data);
                    }
                }
            }
        });
    },
    resigned: async(req, res) => {
        var comand = req.body;
        var memberid = comand.data1;
        var password1 = comand.data2;
        var password2 = comand.data3;

        connection.query('SELECT * FROM member WHERE memberid = ?', [memberid], function (error, data) {

            if (error) {
                console.log("err ocurred", error);
            }
            else {
                if (data.length > 0) {
                    if (data[0].password == password1) {
                        if (password1 == password2) {
                            console.log("회원님과 함께 할 수 있어 영광이었습니다.");
                            connection.query('DELETE FROM member WHERE memberid = ?', [memberid], function (error, results, field) {

                                if (error) {
                                    cnonsole.log("err ocurred", error);
                                }
                                else {
                                    console.log("떠나신 회원님의 앞날에 행복이 있기를....")
                                    res.json(data);
                                }
                            });
                        }
                        else {
                            console.log("본 회사의 회원이나, 두 비밀번호가 다릅니다.");
                            res.json(data);
                        }
                    }
                    else {
                        console.log("본 회사의 회원이나, 비밀번호가 다릅니다.");
                        res.json(data);
                    }
                }
                else {
                    console.log("관련 아이디가 존재하지 않습니다.");
                    res.json(data);
                }
            }

        });
    },
};

module.exports = {
    output,
    process,
};