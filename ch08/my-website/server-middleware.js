'use strict';

var connect = require('connect'),
    fs = require('fs'),
    http = require('http');

var app = connect();

app.use(function (req, res, next) {
  // you always log
  console.error(' %s %s', req.method, req.url);
  next();
});

app.use(function (req, res, next) {
  if ('GET' === req.method && '/images' === req.url.substr(0, 7)
       && '.jpg' === req.url.substr(-4)) {

      // serve image

      fs.stat(__dirname + '/website' + req.url, function (err, stat) {
        if(err || !stat.isFile()) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }

        res.writeHead(200, {'Content-Type' : 'application/jpg'});
        fs.createReadStream(__dirname + '/website' + req.url).pipe(res);
      });
  } else {
    // let other middleware handle it
    next();
  }
});

app.use(function (req, res, next) {
  if ('GET' === req.method && '/' === req.url) {

    // serve index

    fs.stat(__dirname + '/website/index.html', function (err, stat) {
      if(err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }

      res.writeHead(200, {'Content-Type' : 'text/html'});
      fs.createReadStream(__dirname + '/website/index.html').pipe(res);
    });
  } else {
    // let other middleware handle it
    next();
  }
});

app.use(function (req, res, next) {
  // last middleware, if you got here you don’t know what to do with this
  res.writeHead(404);
  res.end('Not Found');
});

http.createServer(app).listen(3000);
