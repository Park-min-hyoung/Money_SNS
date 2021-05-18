"use strict";

const db = require("../config/db");

class UserStorage {
    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query, 
            [userInfo.id, userInfo.name, userInfo.psword],
            (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            })
        });
    }

    static photogetTitle(seq) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM photo WHERE seq = ?";
            db.query(query, [seq], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static videogetTitle(seq) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM video WHERE seq = ?";
            db.query(query, [seq], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static photogetDescription(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM photo WHERE photo_title = ?";
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static videogetDescription(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM video WHERE video_title = ?";
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static async photoplusUpdate(title, like_cnt) {
        const query = "UPDATE photo SET photo_like_cnt=? WHERE photo_title = ?";
        db.query(query, 
        [like_cnt + 1, title],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    
    static async photominusUpdate(title, like_cnt) {
        const query = "UPDATE photo SET photo_like_cnt=? WHERE photo_title = ?";
        db.query(query, 
        [like_cnt - 1, title],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async savePhoto(contents, id) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO photo(photo_like_cnt, photo_id, photo_title, photo_description) VALUES(?, ?, ?, ?);";
            db.query(query, 
            [0, id, contents.title, contents.description],
            (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            })
        });
    }

    static async saveVideo(contents, id) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO video(video_like_cnt, video_id, video_title, video_description) VALUES(?, ?, ?, ?);";
            db.query(query, 
            [0, id, contents.title, contents.description],
            (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            })
        });
    }

    static searchPoint(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static async addPoint(pt, seq) {
        const query = "UPDATE users SET point=? WHERE seq = ?";
        db.query(query, 
        [pt + 10, seq],
        (err) => {
            if(err) reject(`${err}`);
        })
    }
}

module.exports = UserStorage;