const express = require('express')
var http = require('http');
var fs = require('fs');
var app = express();
var path = require('path');

var user = require('./routes/user');

app.use('/user', user);
//指定静态资源目录
app.use(express.static(__dirname + '/view/dist'))

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/view/dist/index.html');

});
app.listen(3000, () => console.log('Example app listening on port 3000!'))