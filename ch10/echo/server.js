var WebSocketServer = require('websocket').server;
var express = require('express');

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
  console.log((new Date()) + ' Server is listening on port 3000');
});

var wsServer = new WebSocketServer({
  httpServer : server,
  autoAcceptConnections : false
});

wsServer.on('request', function (request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function (message) {
    console.log(' \033[96mgot:\033[39m ' + message.utf8Data);
    connection.sendUTF('pong');
  });

  connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
