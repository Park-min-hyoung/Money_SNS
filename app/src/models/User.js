"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        const { id, psword } = await UserStorage.getUserInfo(client.id);

        if (id) {
            if (id === client.id && psword === client.psword){
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."}; 
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

    async photoSearchTitle(num) {
        const {photo_title} = await UserStorage.photogetTitle(num);
        return photo_title;
    }

    async videoSearchTitle(num) {
        const {video_title} = await UserStorage.videogetTitle(num);
        return video_title;
    }

    async photoSearchDescription(id) {
        const {photo_description} = await UserStorage.photogetDescription(id);
        return photo_description;
    }

    async videoSearchDescription(id) {
        const {video_description, video_id} = await UserStorage.videogetDescription(id);
        return [video_description, video_id];
    }

    async photoSearchlike(id) {
        const {photo_like_cnt} = await UserStorage.photogetDescription(id);
        return photo_like_cnt;
    }

    async videoSearchlike(id) {
        const {video_like_cnt} = await UserStorage.videogetDescription(id);
        return video_like_cnt;
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

    async photopluslike(id) {
        const {photo_title, photo_like_cnt} = await UserStorage.photogetDescription(id);
        await UserStorage.photoplusUpdate(photo_title, photo_like_cnt);
    }

    async photominuslike(id) {
        const {photo_title, photo_like_cnt} = await UserStorage.photogetDescription(id);
        await UserStorage.photominusUpdate(photo_title, photo_like_cnt);
    }

    async videopluslike(id) {
        const {video_title, video_like_cnt} = await UserStorage.videogetDescription(id);
        await UserStorage.videoplusUpdate(video_title, video_like_cnt);
    }

    async videominuslike(id) {
        const {video_title, video_like_cnt} = await UserStorage.videogetDescription(id);
        await UserStorage.videominusUpdate(video_title, video_like_cnt);
    }

    async photoChecklike(visit_id) {
        await UserStorage.photocheckUpdate(visit_id);
    }

    async photounChecklike(visit_id) {
        await UserStorage.photouncheckUpdate(visit_id);
    }

    async videoChecklike(visit_id) {
        await UserStorage.videocheckUpdate(visit_id);
    }

    async videounChecklike(visit_id) {
        await UserStorage.videouncheckUpdate(visit_id);
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
        const {point, seq} = await UserStorage.searchPoint(id);
        await UserStorage.addPoint(point, seq);
    }
}

module.exports = User;