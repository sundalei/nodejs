// 'use strict';

/**
 * Module dependencies
 */

var net = require('net');

/**
 * Keep track of connections.
 */

var count = 0;

/**
 * Create server.
 */

var server = net.createServer(function (socket) {
  socket.setEncoding('utf8');
  // handle connection
  socket.write('\n > welcome to \033[92mnode-chat\033[39m!'
     + '\n > ' + count + ' other people are connected at this time.'
     + '\n > please write your name and press enter: ');
  count++;

  socket.on('data', function (data) {
    console.log(data);
  });

  socket.on('close', function () {
    //console.log('close occurs');
    count--;
  })
});

/**
 * Listen.
 */

server.listen(3000, function () {
  console.log('\033[96m  server listening on *:3000\033[39m');
});
