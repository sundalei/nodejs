/**
 * Module dependencies.
 */

var express = require('express'),
    sio = require('socket.io'),
    bodyParser = require('body-parser');

/**
 * Create app.
 */

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/**
 * Listen
 */

var server = app.listen(3000, function () {
  console.log((new Date()) + ' Server is listening on port 3000');
});

//var io = sio.listen(server);
var io = sio(server);

io.on('connection', function (socket) {
  console.log('Someone connected');
});
