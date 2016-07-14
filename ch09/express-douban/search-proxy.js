var request = require('superagent');

// extend with request#proxy
require('superagent-proxy')(request);

// HTTP, HTTPS, or SOCKS proxy to use
var proxy = 'http://10.167.196.133:8080';

/**
 * Search function.
 * @param {String} search query
 * @param {Function} callback
 * @api public
 */
module.exports = function search (query, fn) {

  request.post('http://api.douban.com/v2/movie/search')
         .proxy(proxy)
         .send({tag : query})
         .end(function (err, res) {
           if (res.body && Array.isArray(res.body.subjects)) {
             return fn(null, res.body.subjects);
           }
           fn(new Error('Bad douban resquest'));
         });
}
