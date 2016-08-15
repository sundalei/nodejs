/**
 * Module dependencies
 */

var express = require('express'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
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
 * Middleware.
 */

app.use(bodyParser.urlencoded({extended: false}));

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
  connection.query('INSERT INTO item SET title = ?, description = ?, created = ?',
    [req.body.title, req.body.description, new Date], function (err, info) {
    if (err) {
      return next(err);
    }
    console.log(' - item created with id %s', info.insertId);
    res.redirect('/');
  });
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
  connection.query('INSERT INTO review SET item_id = ?, stars = ?, text = ?, ' +
        'created = ?', [req.params.id, req.body.stars, req.body.text, new Date],
        function (err, info) {
    if (err) {
      return next(err);
    }
    console.log(' - review created with id %s', info.insertId);
    res.redirect('/item/' + req.params.id);
  });
});

/**
 * Listen
 */

app.listen(3000, function () {
  console.log(' - listening on http://*:3000');
});
