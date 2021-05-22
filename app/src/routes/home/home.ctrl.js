"use strict";

const User = require("../../models/User");
const fs = require("fs");
const url = require('url');

var upload_id;

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
    board: async (req, res) => {
        // fs.name 까지는 가장 최근의 img 파일의 이름을 가장 최근의 txt 파일의 이름으로 변경하는 것이다.
        const dir_photo = './src/public/uploads/photo/';
        const dir_video = './src/public/uploads/video/';
        const dir_thumbnail = './src/public/uploads/thumbnail/';

        const list_photo = fs.readdirSync(dir_photo).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_photo + filename).mtime
            }
        });
        const list_video = fs.readdirSync(dir_video).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_video + filename).mtime
            }
        });
        const list_thumbnail = fs.readdirSync(dir_thumbnail).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_thumbnail + filename).mtime
            }
        });
        
        list_photo.sort((a, b) => b.mtime - a.mtime);
        const photo_user = new User();
        const photo_title = await photo_user.photoSearchTitle(list_photo.length);
        fs.rename('src/public/uploads/photo/' + list_photo[0].filename, 'src/public/uploads/photo/' + photo_title + '.png', function(err){});
        
        list_video.sort((a, b) => b.mtime - a.mtime);
        const video_user = new User();
        const video_title = await video_user.videoSearchTitle(list_video.length);
        fs.rename('src/public/uploads/video/' + list_video[0].filename, 'src/public/uploads/video/' + video_title + '.mp4', function(err){});

        list_thumbnail.sort((a, b) => b.mtime - a.mtime);
        fs.rename('src/public/uploads/thumbnail/' + list_thumbnail[0].filename, 'src/public/uploads/thumbnail/' + video_title + '.png', function(err){});
        
        var photo_array = [];
        for (var i = 1; i <= list_photo.length; i++){
            photo_array.push(await photo_user.photoSearchTitle(i));
        }

        var video_array = [];
        for (var i = 1; i <= list_video.length; i++){
            video_array.push(await video_user.videoSearchTitle(i));
        }

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
        res.render('home/board', {photo: photo_array, video: video_array, id:upload_id});

    },
    board_id: async (req, res) => {
        var id = req.params.id;
        var queryData = url.parse(req.url, true).query;
        var check = queryData.like;
        upload_id = queryData.id;

        const photo_user = new User();
        var photo_des_like = await photo_user.photoSearchDesLike(id); // photo의 des와 like를 DB에서 같이 가져오는 소스코드

        var photo_like_cnt = photo_des_like[0];
        await photo_user.photoLike(upload_id, id); // 특정 id의 해당 사진을 방문한 이력을 가지고 있는 DB 생성
        var photo_like_check = await photo_user.getphotoCheck(upload_id + id); // 방문 이력이 있는 DB의 like_check 값을 가져온다

        if (check == 1){
            await photo_user.photoUpatelike(id, check);
            photo_like_cnt += 1;
            await photo_user.photoChecklike(upload_id + id, check); // 방문 이력이 있는 DB의 like_check 값을 1로 수정
            photo_like_check = 1;
        }
        else if (check == 0) {
            await photo_user.photoUpatelike(id, check);
            photo_like_cnt -= 1;
            await photo_user.photoChecklike(upload_id + id, check); // 방문 이력이 있는 DB의 like_check 값을 0으로 수정
            photo_like_check = 0;
        }

        res.render('home/board_photo', {title:id, description:photo_des_like[1], like:photo_like_cnt, like_check:photo_like_check, id:upload_id});
    },
    upload: (req, res) => {
        res.render("home/upload");
    },
    txt_upload: (req, res) => {
        res.render("home/txt_upload");

        var queryData = url.parse(req.url, true).query;
        upload_id = queryData.id;
    },
    board_video: (req, res) => {
        res.render("home/board_video");
    },
    board_video_id: async (req, res) => {
        var id = req.params.id;
        var queryData = url.parse(req.url, true).query;
        var check = queryData.like;
        upload_id = queryData.id; 

        const video_user = new User();
        var video_des_like = await video_user.videoSearchDesLike(id);

        var video_like_cnt = video_des_like[0];
        await video_user.videoLike(upload_id, id); // 특정 id의 해당 영상을 방문한 이력을 가지고 있는 DB 생성
        var video_like_check = await video_user.getvideoCheck(upload_id + id); // 방문 이력이 있는 DB의 like_check 값을 가져온다

        if (check == 3){
            await video_user.videoUpatelike(id, check);
            video_like_cnt += 1;
            await video_user.videoChecklike(upload_id + id, check); // 방문 이력이 있는 DB의 like_check 값을 3로 수정
            video_like_check = 3;
        }
        else if (check == 2) {
            await video_user.videoUpatelike(id, check);
            video_like_cnt -= 1;
            await video_user.videoChecklike(upload_id + id, check); // 방문 이력이 있는 DB의 like_check 값을 2으로 수정
            video_like_check = 2;
        }

        res.render('home/board_video', {title:id, description:video_des_like[1], like:video_like_cnt, like_check:video_like_check, user_id:video_des_like[2], id:upload_id});
    },
};

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
    txt_upload: async(req, res) => {
        const video = req.body.video;
        const user = new User(req.body);
        
        if(video == "mp4"){
            const response = await user.videoUpload(upload_id);
            await user.plusPoint(upload_id);
            return res.json(response);
        } else{
            const response = await user.photoUpload(upload_id);
            await user.plusPoint(upload_id);
            return res.json(response);
        }
    },
    upload: (req, res) => {
        const response = { success: true };
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};