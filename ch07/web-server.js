'use strict';

require('http').createServer(function (req, resp) {
  resp.writeHead(200, {'Content-Type' : 'image/jpg'});
  var stream = require('fs').createReadStream('image.jpg');

  stream.on('data', function (data) {
    resp.write(data);
  });

  stream.on('end', function () {
    resp.end();
  });
}).listen(3000);
