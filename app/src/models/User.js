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
        const {video_description} = await UserStorage.videogetDescription(id);
        return video_description;
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