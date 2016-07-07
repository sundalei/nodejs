'use strict';

var connect = require('connect'),
    http = require('http'),
    serveStatic = require('serve-static'),
    formidable = require('formidable'),
    util = require('util');

var app = connect();

app.use(serveStatic(__dirname + '/static'));

app.use(function (req, res, next) {
  if ('POST' === req.method) {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/upload';

    form.parse(req, function (err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  } else {
    next();
  }
});

http.createServer(app).listen(3000);
