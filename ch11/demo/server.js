var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.send('hello');
  socket.emit('my event', {my : 'object'});
  socket.on('message', function (mes) {
    console.log(mes);
  });
});
server.listen(3000, function () {
  console.log((new Date()) + ' Server is listening on port 3000');
});
