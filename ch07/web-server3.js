'use strict';

require('http').createServer(function (req, res) {
  //console.log(req.headers);
  console.log(req.connection);
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end('Hello <b>World</b>');
}).listen(3000);
