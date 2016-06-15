'use strict';

var net = require('net');

net.createServer(function (connection) {
  connection.on('error', function (err) {
    console.error(err);
  });

  console.log('connection success');
}).listen(4000);
