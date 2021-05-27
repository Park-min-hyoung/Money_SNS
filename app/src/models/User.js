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

    async minusPoint(id) {
        const {point} = await UserStorage.searchPoint(id);
        await UserStorage.removePoint(point, id);
    }

    async photoSearchTitle(num) {
        const {photo_title} = await UserStorage.photogetTitle(num);
        return photo_title;
    }

    async videoSearchTitle(num) {
        const {video_title} = await UserStorage.videogetTitle(num);
        return video_title;
    }

    async photoSearchTitledesLike(seq) {
        const {photo_like_cnt, photo_title, photo_description} = await UserStorage.photogetDescription(seq);
        return [photo_like_cnt, photo_title, photo_description];
    }

    async videoSearchTitledesLike(seq) {
        const {video_like_cnt, video_title, video_description, video_id} = await UserStorage.videogetDescription(seq);
        return [video_like_cnt, video_title, video_description, video_id];
    }

    async photoLike(id, title, check_seq) {
        try {
            await UserStorage.photolikeProduce(id, title, check_seq);
        } catch (err) {
            return { success: false, msg: "사진 클릭 중 에러가 발생하였습니다."};
        }
    }

    async videoLike(id, title, check_seq) {
        try {
            await UserStorage.videolikeProduce(id, title, check_seq);
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

    async photoUpatelike(photo_seq, check) {
        const {seq, photo_like_cnt} = await UserStorage.photogetDescription(photo_seq);
        if (check == 1) {
            await UserStorage.photocountUpdate(seq, photo_like_cnt, check);
        } else {
            await UserStorage.photocountUpdate(seq, photo_like_cnt, check);
        }
    }

    async videoUpatelike(video_seq, check) {
        const {seq, video_like_cnt} = await UserStorage.videogetDescription(video_seq);
        if (check == 3) {
            await UserStorage.videocountUpdate(seq, video_like_cnt, check);
        } else {
            await UserStorage.videocountUpdate(seq, video_like_cnt, check);
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

    async photodeclarationUpdate(photo_seq) {
        const {seq, photo_declaration} = await UserStorage.photogetDescription(photo_seq);
        await UserStorage.photodeClaration(seq, photo_declaration);
    }

    async videodeclarationUpdate(photo_seq) {
        const {seq, video_declaration} = await UserStorage.videogetDescription(photo_seq);
        await UserStorage.videodeClaration(seq, video_declaration);
    }

    async photoDelete(photo_seq) {
        await UserStorage.deletePhoto(photo_seq);
    }

    async photoseqUpdate(photo_seq, photo_final_seq) {
        await UserStorage.seqincreasePhoto(photo_seq, photo_final_seq);
    }

    async seqstartUpdate(photo_start_seq) {
        await UserStorage.startseqUpdate(photo_start_seq);
    }

    async photoseqSearch() {
        const {seq} = await UserStorage.photosearchSeq();
        return seq;
    }

    async photooverlapDelete(delete_overlap) {
        await UserStorage.deleteoverlapPhoto(delete_overlap);
    }

    async photooverlapUpdate(update_overlap_title, update_overlap_cnt, update_cnt) {
        const {user_id} = await UserStorage.searchoverlapPhoto(update_overlap_title + update_overlap_cnt);
        console.log(user_id);
    }
    
}

module.exports = User;