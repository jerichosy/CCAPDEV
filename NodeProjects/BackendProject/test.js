// This is solely for testing DB connection.

const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/post-db');

// C IN CRUD: Create
// Post.create({
//     title: 'Post 2',
//     description: 'This is post 2',
//     content: 'This is the content of post 2'
// }, (err, post) => {
//     console.log(err, post)
// })

// R IN CRUD: Read
Post.find({}, (err, post) => {
    console.log(err, post)
})