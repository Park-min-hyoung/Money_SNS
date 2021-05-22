"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);

        if (user) {
            if (user.id === client.id && user.psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err) {
            return { success: false, err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: "이미 존재하는 아이디입니다."};
        }
    }

    async photoUpload(id) {
        const client = this.body;
        try {
            const response = await UserStorage.savePhoto(client, id);
            return response;
        } catch (err) {
            return { success: false, msg: "업로드에 실패하였습니다."};
        }
    }

    async videoUpload(id) {
        const client = this.body;
        try {
            const response = await UserStorage.saveVideo(client, id);
            return response;
        } catch (err) {
            return { success: false, msg: "업로드에 실패하였습니다."};
        }
    }

    async plusPoint(id) {
        const {point} = await UserStorage.searchPoint(id);
        await UserStorage.addPoint(point, id);
    }

    async photoSearchTitle(num) {
        const {photo_title} = await UserStorage.photogetTitle(num);
        return photo_title;
    }

    async videoSearchTitle(num) {
        const {video_title} = await UserStorage.videogetTitle(num);
        return video_title;
    }

    async photoSearchDesLike(id) {
        const {photo_like_cnt, photo_description} = await UserStorage.photogetDescription(id);
        return [photo_like_cnt, photo_description];
    }

    async videoSearchDesLike(id) {
        const {video_like_cnt, video_description, video_id} = await UserStorage.videogetDescription(id);
        return [video_like_cnt, video_description, video_id];
    }

    async photoLike(id, title) {
        try {
            await UserStorage.photolikeProduce(id, title);
        } catch (err) {
            return { success: false, msg: "사진 클릭 중 에러가 발생하였습니다."};
        }
    }

    async videoLike(id, title) {
        try {
            await UserStorage.videolikeProduce(id, title);
        } catch (err) {
            return { success: false, msg: "사진 클릭 중 에러가 발생하였습니다."};
        }
    }

    async getphotoCheck(visit_id) {
        const {like_check} = await UserStorage.getPcheck(visit_id);
        return like_check;
    }

    async getvideoCheck(visit_id) {
        const {like_check} = await UserStorage.getVcheck(visit_id);
        return like_check;
    }

    async photoUpatelike(id, check) {
        const {photo_title, photo_like_cnt} = await UserStorage.photogetDescription(id);
        if (check == 1) {
            await UserStorage.photocountUpdate(photo_title, photo_like_cnt, check);
        } else {
            await UserStorage.photocountUpdate(photo_title, photo_like_cnt, check);
        }
    }

    async videoUpatelike(id, check) {
        const {video_title, video_like_cnt} = await UserStorage.videogetDescription(id);
        if (check == 3) {
            await UserStorage.videocountUpdate(video_title, video_like_cnt, check);
        } else {
            await UserStorage.videocountUpdate(video_title, video_like_cnt, check);
        }
        
    }

    async photoChecklike(visit_id, check) {
        if (check == 1){
            await UserStorage.photocheckUpdate(visit_id, check);
        } else {
            await UserStorage.photocheckUpdate(visit_id, check);
        }
    }

    async videoChecklike(visit_id, check) {
        if (check == 3){
            await UserStorage.videocheckUpdate(visit_id, check);
        } else {
            await UserStorage.videocheckUpdate(visit_id, check);
        }
    }
}

module.exports = User;