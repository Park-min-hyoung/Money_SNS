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
        const {photo_like_cnt, photo_title, photo_description, photo_id} = await UserStorage.photogetDescription(seq);
        return [photo_like_cnt, photo_title, photo_description, photo_id];
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

    async videoDelete(photo_seq) {
        await UserStorage.deleteVideo(photo_seq);
    }

    async photoseqUpdate(photo_seq) {
        await UserStorage.seqincreasePhoto(photo_seq);
    }

    async videoseqUpdate(video_seq) {
        await UserStorage.seqincreaseVideo(video_seq);
    }

    async seqstartupdatePhoto(photo_start_seq) {
        await UserStorage.startsequpdatePhoto(photo_start_seq);
    }

    async seqstartupdateVideo(video_start_seq) {
        await UserStorage.startsequpdateVideo(video_start_seq);
    }

    async commentseqstartupdatePhoto(photo_start_seq) {
        await UserStorage.startcommentsequpdatePhoto(photo_start_seq);
    }

    async commentseqstartupdateVideo(video_start_seq) {
        await UserStorage.startcommentsequpdateVideo(video_start_seq);
    }

    async photoseqSearch() {
        const {seq} = await UserStorage.photosearchSeq();
        return seq;
    }

    async videoseqSearch() {
        const {seq} = await UserStorage.videosearchSeq();
        return seq;
    }

    async photocommentseqSearch() {
        const {seq} = await UserStorage.photocommentsearchSeq();
        return seq;
    }

    async videocommentseqSearch() {
        const {seq} = await UserStorage.videocommentsearchSeq();
        return seq;
    }

    async photooverlapDelete(delete_overlap) {
        await UserStorage.deleteoverlapPhoto(delete_overlap);
    }

    async videooverlapDelete(delete_overlap) {
        await UserStorage.deleteoverlapVideo(delete_overlap);
    }

    async photocommentoverlapDelete(delete_overlap) {
        await UserStorage.deletecommentoverlapPhoto(delete_overlap);
    }

    async videocommentoverlapDelete(delete_overlap) {
        await UserStorage.deletecommentoverlapVideo(delete_overlap);
    }

    async photooverlapUpdate(title, current_cnt, update_cnt) {
        var current_overlap = title + current_cnt;
        await UserStorage.updateoverlapPhoto(current_overlap, title, update_cnt);
    }

    async videooverlapUpdate(title, current_cnt, update_cnt) {
        var current_overlap = title + current_cnt;
        await UserStorage.updateoverlapVideo(current_overlap, title, update_cnt);
    }

    async photocommentoverlapUpdate(title, current_cnt, update_cnt) {
        var current_overlap = title + current_cnt;
        await UserStorage.updatecommentoverlapPhoto(current_overlap, title, update_cnt);
    }

    async videocommentoverlapUpdate(title, current_cnt, update_cnt) {
        var current_overlap = title + current_cnt;
        await UserStorage.updatecommentoverlapVideo(current_overlap, title, update_cnt);
    }
    
    async photocommentUpload(user_id, overlap, photo_comment) {
        try {
            const response = await UserStorage.uploadcommentPhoto(user_id, overlap, photo_comment);
            return response;
        } catch (err) {
            return { success: false, msg: "업로드에 실패하였습니다."};
        }
    }

    async videocommentUpload(user_id, overlap, video_comment) {
        try {
            const response = await UserStorage.uploadcommentVideo(user_id, overlap, video_comment);
            return response;
        } catch (err) {
            return { success: false, msg: "업로드에 실패하였습니다."};
        }
    }

    async photocommentDelete(delete_seq) {
        return UserStorage.deletecommentPhoto(delete_seq);
    }
    
    async videocommentDelete(delete_seq) {
        return UserStorage.deletecommentVideo(delete_seq);
    }

    async photocommentUpdate(update_seq, update_comment) {
        return UserStorage.updatecommentPhoto(update_seq, update_comment);
    }

    async videocommentUpdate(update_seq, update_comment) {
        return UserStorage.updatecommentVideo(update_seq, update_comment);
    }

    async photocommentCount(overlap) {
        return UserStorage.commentphotoCount(overlap);
    }

    async videocommentCount(overlap) {
        return UserStorage.commentvideoCount(overlap);
    }

    async photocommentgetId(overlap) {
        const {seq, user_id, photo_comments, upload_time} = await UserStorage.commentgetIdPhoto(overlap);
        await UserStorage.commentcheckpUpdate(seq, overlap); 
        return [user_id, photo_comments, upload_time, seq];
    }

    async videocommentgetId(overlap) {
        const {seq, user_id, video_comments, upload_time} = await UserStorage.commentgetIdVideo(overlap);
        await UserStorage.commentcheckvUpdate(seq, overlap); 
        return [user_id, video_comments, upload_time, seq];
    }

    async commentpcheckRenew(overlap) {
        await UserStorage.photocommentRenew(overlap);
    }

    async commentvcheckRenew(overlap) {
        await UserStorage.videocommentRenew(overlap);
    }
}

module.exports = User;