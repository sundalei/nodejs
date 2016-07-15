var express = require('express');
var app = express();

app.get('/', function (req, res) {
  //res.send({hello : 'world'});
  //res.send([1, 2, 3]);
  //res.send(500);
  //res.sendStatus(500);
  res.json(5);
});

app.listen(3000);
