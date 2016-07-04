'use strict';

/**
 * Module dependencies.
 */

var connect = require('connect'),
    serveStatic = require('serve-static');

/**
 * Create server.
 */

var app = connect();
//console.log(app);

/**
 * Handle static files.
 */

app.use(serveStatic(__dirname + '/website'));

/**
 * Listen
 */

app.listen(3000);
