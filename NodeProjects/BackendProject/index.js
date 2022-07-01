// npm install mongodb
// npm install mongoose
// npm install hbs

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/post-db');

const express = require('express');
const app = new express();

const Post = require('./database/models/Post');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// older CCAPDEV tutorial used the above, while newer tutorials use the below (bodyParser):

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

const hbs = require('hbs');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-post', function(req, res) {
    // console.log(req.body);  // Whatever the output of this, it's format should match the one in the DB schema.
    Post.create(req.body, (err, post) => {  // This is similar to what's found in test.js
        res.redirect('/'); 
    });
});

app.get('/content', async(req, res) => {
    const posts = await Post.find({});
    // res.send(posts);  // This will return JSON
    res.render('content', {posts});
});

var server = app.listen(3000, function() {
    console.log('Server is running on port 3000');
});