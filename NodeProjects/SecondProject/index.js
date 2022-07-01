var express = require('express');  // Express is a web framework middleware built on top of Node.js' native HTTP module that provides a robust set of features for building web applications and APIs.
var app = express();

var bodyParser = require('body-parser');  // Body-parser is a node.js middleware for handling HTTP requests' body data (e.g., contents of the Response).
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    // res.send('<h1>Hello World</h1>');
    res.sendFile(__dirname + '/index.html');
});

// app.get('/submit-student-data', function(req, res) {  // GET
app.post('/submit-student-data', function(req, res) {  // POST
    var name = req.body.firstName + " " + req.body.lastName;
    res.send("Student name \"" + name + "\" submitted successfully");
});

var server = app.listen(5000, function() {
    console.log('Server is running on port 5000');
});