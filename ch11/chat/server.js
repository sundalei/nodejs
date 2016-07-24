/**
 * Module dependencies.
 */

var express = require('express'),
    sio = require('socket.io'),
    bodyParser = require('body-parser'),
    request = require('superagent');

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
var currentSong, dj;

function elect (socket) {
  dj = socket;
  io.sockets.emit('announcement', socket.nickname + ' is the new dj');
  socket.emit('elected');
  socket.dj = true;
  socket.on('disconnect', function () {
    dj = null;
    io.sockets.emit('announcement', 'the dj left - next one to join becomes dj');
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');

    if (!dj) {
      elect(socket);
    } else {
      socket.emit('song', currentSong);
    }
  });

  socket.on('text', function (msg, fn) {
    socket.broadcast.emit('text', socket.nickname, msg);

    // confirm the reception
    fn(Date.now());
  });

  socket.on('search', function (q, fn) {
    request.get('http://music.163.com/api/playlist/detail?id=' +
      encodeURIComponent(q)).end(function (err, res) {
      if (res.status === 200) {
        console.log(res.body.result.tracks);
      }
    });
  });
});
