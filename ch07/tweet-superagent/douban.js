'use strict';

var request = require('superagent');

request.get('http://api.douban.com/v2/movie/search').send({tag : '小清新'}).end(function (err, res) {
  var obj = res.body;
  obj.subjects.forEach(function (record) {
    console.log(record.title);
  });
  //console.log(res.text);
});
