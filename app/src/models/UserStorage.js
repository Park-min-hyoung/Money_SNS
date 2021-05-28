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

    static async addPoint(pt, id) {
        const query = "UPDATE users SET point=? WHERE id = ?";
        db.query(query, 
        [pt + 10, id],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async removePoint(pt, id) {
        const query = "UPDATE users SET point=? WHERE id = ?";
        db.query(query, 
        [pt - 10, id],
        (err) => {
            if(err) reject(`${err}`);
        })
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

    static photogetDescription(seq) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM photo WHERE seq = ?";
            db.query(query, [seq], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static videogetDescription(seq) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM video WHERE seq = ?";
            db.query(query, [seq], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            })
        });
    }

    static async photolikeProduce(id, title, check_seq) {
        const query = "INSERT INTO photo_like(user_id, photo_title, overlap) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), photo_title = VALUES(photo_title);";
        db.query(query, 
        [id, title, id + title + check_seq],
        (err) => {
            if(err) reject(`${err}`);
        })
    }

    static async videolikeProduce(id, title, check_seq) {
        const query = "INSERT INTO video_like(user_id, video_title, overlap, like_check) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), video_title = VALUES(video_title);";
        db.query(query, 
        [id, title, id + title + check_seq, 2],
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

    static async photocountUpdate(seq, like_cnt, check) {
        const query = "UPDATE photo SET photo_like_cnt=? WHERE seq = ?";
        if (check == 1) {
            db.query(query, 
            [like_cnt + 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
        } else {
            db.query(query, 
            [like_cnt - 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
        }
    }

    static async videocountUpdate(seq, like_cnt, check) {
        const query = "UPDATE video SET video_like_cnt=? WHERE seq = ?";
        if (check == 3) {
            db.query(query, 
            [like_cnt + 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
        } else {
            db.query(query, 
            [like_cnt - 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
        }
    }

    static async photocheckUpdate(visit_id, check) {
        const query = "UPDATE photo_like SET like_check=? WHERE overlap = ?";
        if (check == 1) {
            db.query(query, [1, visit_id], (err, data) => {
                if(err) reject(`${err}`);
            })
        } else {
            db.query(query, [0, visit_id], (err, data) => {
                if(err) reject(`${err}`);
            })
        }
    }

    static async videocheckUpdate(visit_id, check) {
        const query = "UPDATE video_like SET like_check=? WHERE overlap = ?";
        if (check == 3) {
            db.query(query, [3, visit_id], (err, data) => {
                if(err) reject(`${err}`);
            })
        } else {
            db.query(query, [2, visit_id], (err, data) => {
                if(err) reject(`${err}`);
            })
        }
    }

    static async photodeClaration(seq, declaration) {
        const query = "UPDATE photo SET photo_declaration=? WHERE seq = ?";
            db.query(query, 
            [declaration + 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
    }

    static async videodeClaration(seq, declaration) {
        const query = "UPDATE video SET video_declaration=? WHERE seq = ?";
            db.query(query, 
            [declaration + 1, seq],
            (err) => {
                if(err) reject(`${err}`);
            })
    }

    static async deletePhoto(seq) {
        const query = "DELETE FROM photo WHERE seq = ?";
            db.query(query, 
            [seq],
            (err) => {
                if(err) reject(`${err}`);
            })
    }

    static async seqincreasePhoto(seq) {
        const query = "UPDATE photo SET seq = seq - 1 WHERE seq > ?";
            db.query(query, 
            [seq],
            (err) => {
                if(err) reject(`${err}`);
            })
    }    

    static async startseqUpdate(start_seq) {
        const query = "ALTER TABLE photo AUTO_INCREMENT = ?;";
            db.query(query, 
            [start_seq],
            (err) => {
                if(err) reject(`${err}`);
            })
    }

    static async photosearchSeq() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM photo ORDER BY seq DESC LIMIT 1";
            db.query(query, (err, data) => {
              if (err) reject(`${err}`);
              else resolve(data[0]);
            });
          });
    }

    static async deleteoverlapPhoto(delete_overlap) {
        var del_overlap = "%" + delete_overlap;
        const query = "DELETE FROM photo_like WHERE overlap LIKE ?;";
            db.query(query, 
            [del_overlap],
            (err) => {
                if(err) reject(`${err}`);
            })
    }

    static async updateoverlapPhoto(current_overlap, title, update_cnt) {
        return new Promise((resolve, reject) =>{
            const query = "UPDATE photo_like SET overlap = REPLACE(overlap, ?, ?);";
                db.query(query, 
                [current_overlap, title + update_cnt],
                (err, data) => {
                    if(err) reject(`${err}`);
                    else resolve(data[0]);
                });
        });
    }
}

module.exports = UserStorage;