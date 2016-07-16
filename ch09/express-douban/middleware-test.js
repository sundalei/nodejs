var express = require('express');
var app = express();

function secure (req, res, next) {
  if (req.params.username !== 'sundalei') {
    return res.status(403).send('username not authorized.');
  }
  next();
}

function secure2 (req, res, next) {
  console.log(req.params);
  if (req.params.password !== '1234') {
    return res.status(403).send('password not authorized!');
  }
  next();
}

app.get('/home', function (req, res) {
  // accessible to everyone
  res.send('<h1>Welcome to home page</h1>');
});

app.get('/financials/:username', secure, function (req, res) {
  // secure!
  res.send('<h1>Authorized sundalei</h1>');
});

app.get('/about', function (req, res) {
  // accessible to everyone
  res.send('<h1>Welcome to about page</h1>')
});

app.get('/roadmap/:username', secure, function (req, res) {
  // secure!
  res.send('<h1>Authorized sundalei</h1>');
});

app.get('/route/:username/:password', secure, secure2, function (req, res, next) {
  res.send('<h1>Authorized sundalei 1234</h1>');
});

app.listen(3000);
