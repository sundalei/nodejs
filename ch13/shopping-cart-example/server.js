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
  connection.query('SELECT id, title, description FROM item', function (err, results) {
    res.render('index', {items: results});
  });
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
  function getItem(fn) {
    connection.query('SELECT id, title, description FROM item WHERE id = ? LIMIT 1',
         [req.params.id], function (err, results) {
      if (err) {
        return next(err);
      }
      if(!results[0]) {
        return res.send(404);
      }
      fn(results[0]);
    });
  }

  function getReviews(item_id, fn) {
    connection.query('SELECT text, stars FROM review WHERE item_id = ?',
      [item_id], function (err, results) {
      if (err) {
        return next(err);
      }
      fn(results);
    });
  }

  getItem(function (item) {
    getReviews(item.id, function (reviews) {
      res.render('item', {item: item, reviews: reviews});
    });
  });
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
