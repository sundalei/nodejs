var socket = require('socket.io-client')('http://localhost:3000');
socket.on('message', function (mes) {
  console.log(mes);
});
socket.on('my event', function (obj) {
  console.log(obj.my);
});
socket.send('world');
