var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.redirect(301, '/test');
});

app.get('/test', function (req, res) {
  res.send({hello : 'world'});
});

app.get('/file', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/jquery-2.2.3.js', function (req, res) {
  res.sendFile(__dirname + '/jquery-2.2.3.js');
});

app.listen(3000);
