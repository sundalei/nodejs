'use strict';

var connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    multipart = require('connect-multiparty');

var app = connect();

app.use(multipart());

app.use(serveStatic(__dirname + '/static'));

app.use(function (req, res, next) {
  console.log(req.body);
  console.log(req.files);
});

http.createServer(app).listen(3000);
