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

    static async photolikeProduce(id, title) {
        const query = "INSERT INTO photo_like(user_id, photo_title, overlap) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), photo_title = VALUES(photo_title);";
        db.query(query, 
        [id, title, id + title],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async videolikeProduce(id, title) {
        const query = "INSERT INTO video_like(user_id, video_title, overlap, like_check) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), video_title = VALUES(video_title);";
        db.query(query, 
        [id, title, id + title, 2],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static getPcheck(visit_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM photo_like WHERE overlap = ?";
            db.query(query, [visit_id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static getVcheck(visit_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM video_like WHERE overlap = ?";
            db.query(query, [visit_id], (err, data) => {
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

    static async videoplusUpdate(title, like_cnt) {
        const query = "UPDATE video SET video_like_cnt=? WHERE video_title = ?";
        db.query(query, 
        [like_cnt + 1, title],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async videominusUpdate(title, like_cnt) {
        const query = "UPDATE video SET video_like_cnt=? WHERE video_title = ?";
        db.query(query, 
        [like_cnt - 1, title],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async photocheckUpdate(visit_id) {
        const query = "UPDATE photo_like SET like_check=? WHERE overlap = ?";
        db.query(query, [1, visit_id], (err, data) => {
            if(err) reject(`${err}`);
        })
    }

    static async photouncheckUpdate(visit_id) {
        const query = "UPDATE photo_like SET like_check=? WHERE overlap = ?";
        db.query(query, [0, visit_id], (err, data) => {
            if(err) reject(`${err}`);
        })
    }

    static async videocheckUpdate(visit_id) {
        const query = "UPDATE video_like SET like_check=? WHERE overlap = ?";
        db.query(query, [3, visit_id], (err, data) => {
            if(err) reject(`${err}`);
        })
    }

    static async videouncheckUpdate(visit_id) {
        const query = "UPDATE video_like SET like_check=? WHERE overlap = ?";
        db.query(query, [2, visit_id], (err, data) => {
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