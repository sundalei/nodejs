/**
 * Module requirements.
 */
var express = require('express'),
    search = require('./search');

/**
 * Create app.
 */
var app = express();

/**
 * Configuration
 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', {layout : false});

/**
 * Routes
 */
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', function (req, res, next) {
  search(req.query.q, function (err, tweets) {
    
  });
});

/**
 * Listen
 */
app.listen(3000);