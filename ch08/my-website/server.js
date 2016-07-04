'use strict';

/**
 * Module dependencies.
 */

var connect = require('connect');
var http = require('http');

/**
 * Create server.
 */

var app = connect();
var server = http.createServer(app);

/**
 * Handle static files.
 */

server.use();
