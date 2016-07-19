var WebSocketServer = require('websocket').server;
var express = require('express');

var positions = {};
var total = 0;
var connectedSocket = {};

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, function () {
  console.log((new Date()) + ' Server is listening on port 3000');
});

var ws = new WebSocketServer({
  httpServer : server,
  autoAcceptConnections : false
});

ws.on('request', function (request) {
  var socket = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  // you give the socket an id
  socket.id = ++total;
  connectedSocket[socket.id] = socket;

  // you send the positions of everyone else
  socket.sendUTF(JSON.stringify(positions));
  socket.on('message', function (msg) {
    try {
      var pos = JSON.parse(msg);
    } catch (e) {
      return;
    }

    positions[socket.id] = pos;
    broadcast(JSON.stringify({type : 'position', pos : pos, id : socket.id}));
  });

  socket.on('close', function(reasonCode, description) {
    delete positions[socket.id];
    delete connectedSocket[socket.id];
    broadcast(JSON.stringify({type : 'disconnect', id : socket.id}));
  });

  function broadcast(msg) {
    for (var i in connectedSocket) {
      if (connectedSocket[i] && socket.id !== i) {
        connectedSocket[i].send(msg);
      }
    }
  }
});
