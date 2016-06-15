'use strict';

var http = require('http');

http.createServer(function (request, response) {
  process.on('uncaughtException', function (err) {
    console.log('--------------------------');
    console.error(err);
    process.exit(1);
  });

  throw new Error ('This will be uncaught');
}).listen(3000);
