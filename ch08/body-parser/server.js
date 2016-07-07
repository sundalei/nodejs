'use strict';

var connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    formidable = require('formidable'),
    util = require('util'),
    fs = require('fs');

var app = connect();

app.use(serveStatic(__dirname + '/static'));

app.use(function (req, res, next) {
  if ('POST' === req.method) {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/upload';

    form.parse(req, function (err, fields, files) {

      fs.readFile(files.file.path, 'utf8', function (err, data) {
        if (err) {
          res.writeHead(500);
          res.end('Error!');
          return;
        }

        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(
          [
            '<h3>File: ' + files.file.name + '</h3>',
            '<h4>Type: ' + files.file.type + '</h4>',
            '<h4>Contents:</h4><pre>' + data + '</pre>'
          ].join('')
        );
      });
    });
  } else {
    next();
  }
});

http.createServer(app).listen(3000);
