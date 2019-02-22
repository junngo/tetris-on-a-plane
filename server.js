var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./router/index')(app);

// DB CONNECT
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/tetris');

var Record = require('./models/record');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// USING HTML/STATIC FILE
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

// RUN SERVER
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});
