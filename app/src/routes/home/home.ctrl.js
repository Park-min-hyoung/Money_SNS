"use strict";

const User = require("../../models/User");
const fs = require("fs");

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
    board: (req, res) => {
        // fs.name 까지는 가장 최근의 img 파일의 이름을 가장 최근의 txt 파일의 이름으로 변경하는 것이다.
        const dir_photo = './src/public/uploads/photo/';
        const dir_txt = './src/public/data/photo/';
        const dir_video = './src/public/uploads/video/';
        const dir_vtxt = './src/public/data/video/';
        
        const list_photo = fs.readdirSync(dir_photo).map(filename => {
        return {
            filename: filename,
            mtime: fs.statSync(dir_photo + filename).mtime
        }
        });
        const list_txt = fs.readdirSync(dir_txt).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_txt + filename).mtime
            }
        });
        const list_video = fs.readdirSync(dir_video).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_video + filename).mtime
            }
        });
        const list_vtxt = fs.readdirSync(dir_vtxt).map(filename => {
            return {
                filename: filename,
                mtime: fs.statSync(dir_vtxt + filename).mtime
            }
        });
        
        list_photo.sort((a, b) => b.mtime - a.mtime);
        list_txt.sort((a, b) => b.mtime - a.mtime);
        fs.rename('src/public/uploads/photo/' + list_photo[0].filename, 'src/public/uploads/photo/' + list_txt[0].filename + '.png', function(err){});
        
        list_video.sort((a, b) => b.mtime - a.mtime);
        list_vtxt.sort((a, b) => b.mtime - a.mtime);
        fs.rename('src/public/uploads/video/' + list_video[0].filename, 'src/public/uploads/video/' + list_vtxt[0].filename + '.mp4', function(err){});

        fs.readdir('src/public/data/photo/', function(err, photo){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            fs.readdir('src/public/data/video/', function(err, video){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('home/board', {topics: photo, video: video});
            })
        })
    },
    board_id: (req, res) => {
        var id = req.params.id;

        fs.readdir('src/public/data/photo/', function(err, files){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            fs.readFile('src/public/data/photo/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                // title => 텍스트 파일 이름, description => 파일 내용
                res.render('home/board_photo', {title:id, description:data});
            });
        });
    },
    upload: (req, res) => {
        res.render("home/upload");
    },
    txt_upload: (req, res) => {
        res.render("home/txt_upload");
    },
    board_video_id: (req, res) => {
        var id = req.params.id;

        fs.readdir('src/public/data/video/', function(err, photo){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            fs.readFile('src/public/data/video/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                // title => 텍스트 파일 이름, description => 파일 내용
                res.render('home/board_video', {title:id, description:data});
            });
        });
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
    txt_upload: (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const video = req.body.video;

        if(video == 1){
            fs.writeFile('./src/public/data/video/'+title, description, function(err){
                if(err){
                    res.status(500).send('Internal Server Error');
                }
                const response = { success: true };
                return res.json(response);
            });
        }
        else{
            fs.writeFile('./src/public/data/photo/'+title, description, function(err){
                if(err){
                    res.status(500).send('Internal Server Error');
                }
                const response = { success: true };
                return res.json(response);
            });
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