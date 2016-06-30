'use strict';

var request = require('superagent');

// extend with Request#proxy()
require('superagent-proxy')(request);

// HTTP, HTTPS, or SOCKS proxy to use
var proxy = 'http://10.167.196.133:8080';

request
  .post('http://api.douban.com/v2/movie/search')
  .proxy(proxy)
  .send({tag : '小清新'})
  .set('Date', new Date)
  .end(function (err, res) {
    var obj = res.body;
    obj.subjects.forEach(function (record) {
      console.log(record.title);
    });
  });
