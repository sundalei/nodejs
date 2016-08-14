/**
 * Module dependencies
 */

var express = require('express'),
    mysql = require('mysql'),
    config = require('./config');

/**
 * Create app
 */

var app = express();

/**
 * Configure app
 */

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

/**
 * Connect to MySQL
 */

var connection = mysql.createConnection(config);

/**
 * Main route
 */

app.get('/', function (req, res, next) {
  res.render('index', {items: []});
});

/**
 * Item creation route.
 */

app.post('/create', function (req, res, next) {

});

/**
 * Item route.
 */

app.get('/item/:id', function (req, res, next) {
  res.render('item');
});

/**
 * Item review creation route.
 */

app.post('/item/:id/review', function (req, res, next) {

});

/**
 * Listen
 */

app.listen(3000, function () {
  console.log(' - listening on http://*:3000');
});
