var express = require('express');
var app = express();

app.get('/home', function (req, res) {
  res.send('<h2>Welcome to home page.</h2>');
});

app.get('/:username', function (req, res, next) {
  // if you got here, no prior application routes matched
  if ('sundalei' === req.params.username) {
    res.send('<h1>Welcome back sundalei</h1>');
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000);
