'use strict';

var request = require('superagent');

request.get('http://api.douban.com/v2/movie/search').send({tag : '小清新'}).end(function (res) {
  console.log(res.body);
});
