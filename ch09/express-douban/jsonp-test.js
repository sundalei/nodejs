var express = require('express'),
    serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(__dirname));

app.get('/json', function (req, res) {
  console.log(req.header('Host'));
  console.log(req.accepts('html'));
  console.log(req.accepts('text/html'));
  console.log(req.is('json'));
  console.log(req.is('text/html'));
  app.set('jsonp callback name', 'sundalei');
  res.jsonp({ user: 'tobi' });
});

app.listen(3000);
