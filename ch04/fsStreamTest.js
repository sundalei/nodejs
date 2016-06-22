'use strict';

var fs = require('fs');
var stream = fs.createReadStream('index.js');
stream.on('data', function(chunk) {
  console.log('data : ' + chunk);
});
stream.on('end', function(chunk) {
  console.log('end : ' + chunk);
});
