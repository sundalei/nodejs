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
 * Login process route
 */

app.get('/login/:signupEmail', function (req, res) {
    res.render('login', {signupEmail: req.params.signupEmail});
});

/**
 * Signup route
 */

app.get('/signup', function(req, res) {
    res.render('signup');
});

/**
 * Signup processing route
 */

app.post('/signup', function (req, res, next) {
    var user = req.body;
    app.users.insert(user, function (err, result) {
        if (err) {
            return next(err);
        }
        res.redirect('/login/' + result.ops[0].email);
    });
});

/**
 * Connect to the database.
 */

var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/my-website';

MongoClient.connect(url, function(err, db) {
  if(err) {
      throw err;
  }
  console.log('\033[96m + \033[39m connected to mongodb');
  
  // Get the users collection
  app.users = db.collection('users');

  // db.close();
});

/**
 * Listen
 */

app.listen(3000, function () {
    console.log('\033[96m + \033[39m app listening on *:3000');
});