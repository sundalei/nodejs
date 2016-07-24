var request = require('superagent');

request.get('http://music.163.com/api/playlist/detail?id=428448345')
       .end(function (err, res) {
         console.log(res.body.result.tracks);
       });
