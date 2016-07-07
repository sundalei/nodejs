'use strict';

/**
 * Module dependencies.
 */

var connect = require('connect'),
    morgan = require('morgan'),
    serveStatic = require('serve-static');

/**
 * Create server.
 */

var app = connect();

morgan.token('type', function (req, res) {
  return req.headers['content-type'];
});

/**
 * Handle static files.
 */


app.use(morgan('request type is :type, response type is :res[content-type], length is '
                + ':res[content-length] and it took :response-time ms.'));

app.use(serveStatic(__dirname + '/website'));

/**
 * Listen
 */

app.listen(3000);
