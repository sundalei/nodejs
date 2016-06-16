'use strict';

var fs = require('fs');

fs.readFile('/etc/passwd', function (err, data) {
  if(err) {
    console.error(err);
  }
  console.log(data);
});
