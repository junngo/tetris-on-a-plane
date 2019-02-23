var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// DB CONNECT
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/tetris');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Record = require('./models/record');

// USING HTML/STATIC FILE
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

var router = require('./router/index')(app, Record);

// RUN SERVER
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
