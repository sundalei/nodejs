/**
 * Module dependencies
 */
var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var session = require('express-session');

/**
 * Set up application
 */

var app = express();

/**
 * Middleware.
 */

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));

/**
 * Specify your views options.
 */

app.set('view engine', 'pug');

// the following line won’t be needed in express 3
// app.set('view options', {layout : false});

/**
 * Default route
 */

app.get('/', function(req, res) {
    res.render('index', {authenticated: false});
});

/**
 * Login route
 */

app.get('/login', function(req, res) {
    res.render('login');
});

/**
 * Signup route
 */

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});