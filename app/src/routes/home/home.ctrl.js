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
        fs.readdir('src/public/data', function(err, files){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            fs.readFile('src/public/data/'+ files[0], 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('home/board', {topics:files, description:data});
            });
        })
    },
    board_id: (req, res) => {
        var id = req.params.id;
        fs.readdir('src/public/data', function(err, files){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
    
            fs.readFile('src/public/data/'+id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('home/board', {topics:files, title:id, description:data});
            });
        })
    },
    upload: (req, res) => {
        res.render("home/upload");
    },
    txt_upload: (req, res) => {
        res.render("home/txt_upload");
    },
    board_video: (req, res) => {
        res.render("home/board_video");
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
        fs.writeFile('./src/public/data/'+title, description, function(err){
            if(err){
                res.status(500).send('Internal Server Error');
            }
            const response = { success: true };
            return res.json(response);
        });

    },
    upload: (req, res) => {
        res.render("home/upload");
    },
};

module.exports = {
    output,
    process,
};