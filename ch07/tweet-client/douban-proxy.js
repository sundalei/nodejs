var qs = require('querystring'),
    http = require('http');

var search = process.argv.slice(2).join(' ').trim();
console.log(search);

if (!search.length) {
  return console.log('\n  Usage: node tweets <search term>\n');
}

console.log('\n searching for: \033[96m' + search + '\033[39m\n');

http.request({
  host : '10.167.196.133',
  port : 8080,
  path : 'http://api.douban.com/v2/movie/search?' + qs.stringify({tag : search}),
  headers: {
    host: 'api.douban.com'
  }
}, function (res) {
  var body = '';
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function () {
    var obj = JSON.parse(body);
    obj.subjects.forEach(function (record) {
      console.log(record.title);
    });
  });
}).end();
