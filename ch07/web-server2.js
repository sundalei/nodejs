'use strict';

require('http').createServer(function (req, resp) {
  resp.writeHead(200, {'Content-Type' : 'image/jpg'});
  require('fs').createReadStream('image.jpg').pipe(resp);
}).listen(3000);
