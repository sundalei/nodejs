/**
 * Module dependencies.
 */
var connect = require('connect'),
    morgan = require('morgan'),
    time = require('./request-time');

/**
 * Create server.
 */

var app = connect();

/**
 * Log requests.
 */

app.use(morgan('dev'));

/**
 * Implement time middleware.
 */

app.use(time({time : 500}));

/**
 * Fast response.
 */
app.use(function (req, res, next) {
  if ('/a' === req.url) {
    res.writeHead(200);
    res.end('Fast!');
  } else {
    next();
  }
});

/**
 * Slow response.
 */

 app.use(function (req, res, next) {
   if ('/b' === req.url) {
     setTimeout(function() {
       res.writeHead(200);
       res.end('Slow!');
     }, 1000);
   } else {
     next();
   }
 });

var server = app.listen(3000);
