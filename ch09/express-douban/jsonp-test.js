var express = require('express'),
    serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(__dirname));

app.get('/json', function (req, res) {
  app.set('jsonp callback name', 'sundalei');
  res.jsonp({ user: 'tobi' });
});

app.listen(3000);
