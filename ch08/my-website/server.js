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
//console.log(app);

/**
 * Handle static files.
 */
 

app.use(morgan('type is :res[content-type], length is '
                + ':res[content-length] and it took :response-time ms.'));

// app.use(morgan('type is :type, length is :length-type and it took :response-time ms.'));

app.use(serveStatic(__dirname + '/website'));

/**
 * Listen
 */

app.listen(3000);
