const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded( {extended: false} ));
app.set('views', './views_file');
app.set('view engine', 'ejs');
app.get('/topic/new', function(req, res){
    res.render('new');
})

app.get('/topic', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});
    })
});
app.post('/topic', function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');
    });
})
app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});