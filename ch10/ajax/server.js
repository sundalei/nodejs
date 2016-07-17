var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/position', function (req, res) {
  res.send('position: ' + req.body.x + ' , ' + req.body.y);
});

app.listen(3000);
