var WebSocketServer = require('websocket').server;
var express = require('express');

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
  console.log((new Date()) + ' Server is listening on port 3000');
});

var wsServer = new WebSocketServer({
  httpServer : server,
  
});
