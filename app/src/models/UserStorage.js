"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE id = ?;";
          db.query(query, [id], (err, data) => {
            if (err) reject(`${err}`);
            else resolve(data[0]);
          });
        });
      }

    // static async save(userInfo) {
    //     return new Promise((resolve, reject) => {
    //         const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
    //         db.query(query, 
    //         [userInfo.id, userInfo.name, userInfo.psword],
    //         (err) => {
    //             if(err) reject(`${err}`);
    //             resolve({ success: true });
    //         })
    //     });
    // }

    static getIdCheck(memberid) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ?;";
        db.query(query, [memberid], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("해당 아이디로 가입이 가능합니다");
                  resolve(data);
              }
              else {
                  console.log("해당 아이디로 가입이 불가능합니다.");
                  resolve(data);
              }
          }
        });
      });
    }

    static getNickCheck(nickname) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE nickname = ?;";
        db.query(query, [nickname], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("해당 닉네임로 가입이 가능합니다");
                  resolve(data);
              }
              else {
                  console.log("해당 닉네임으로 가입이 불가능합니다.");
                  resolve(data);
              }
          }
        });
      });
    }

    static getIdNickCheck(memberid, nickname) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE memberid = ? OR nickname = ?;";
        db.query(query, [memberid, nickname], (err, data) => {
          if (err) {
            console.log('user infor is:', err);
          }
          else {
              if (data.length == 0) {
                  console.log("가입된 정보가 없습니다. 가입이 가능합니다.");
                  resolve(data);
              }
              else {
                  console.log('아이디와 닉네임에 중복이 존재해 회원이 되실 수 없습니다.');
                  resolve(data);
              }
          }
        });
      });
    }

    static getMailPhoneCheck(mail, phone) {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM member WHERE mail = ? AND phone = ?;";
        db.query(query, [mail, phone], (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
              if (data.length == 0) {
                  console.log("가입 가능한 정보입니다.");
                  resolve(data);
              }
              else {
                  console.log("이메일과 전화번호가 둘다 같은 회원이 존재합니다. 찾기를 진행해주세요....");
                  resolve(data);
              }
          }
        });
      });
    }

    static saveMember(userInfo) {
      return new Promise((resolve, reject) => {
        const query = "INSERT INTO member(memberid, password, nickname, mail, phone, passwordfind, passwordanswer) VALUES(?, ?, ?, ?, ?, ?, ?);";
        
        db.query(query, [userInfo.userId, userInfo.password2, userInfo.nickname,
          userInfo.mail, userInfo.mobile, userInfo.suba, userInfo.subb], 
          (err, data) => {
          if (err) {
            console.log('user infor is:', error);
          }
          else {
              console.log('성공적으로 쿼리 문을 이식하였습니다.');
              console.log(Object.keys(data).length);
              return true;
          }
          });
      });
    }
}

module.exports = UserStorage;