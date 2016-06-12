'use strict';

var http = require('http');
var serv = http.createServer(function (req, resp) {
  resp.writeHead(200, {'Content-Type' : 'text/html'});
  resp.end('<marquee>Smashing Node!</marquee>');

});

serv.listen(3000);
