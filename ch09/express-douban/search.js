var request = require('superagent');

/**
 * Search function.
 * @param {String} search query
 * @param {Function} callback
 * @api public
 */
module.exports = function search (query, fn) {
  request.get('http://api.douban.com/v2/movie/search')
         .send({tag : query})
         .end(function (err, res) {
           if (res.body && Array.isArray(res.body.subjects)) {
             return fn (null, res.body.subjects);
           }
           fn (new Error ('Bad douban response'));
         });
}
