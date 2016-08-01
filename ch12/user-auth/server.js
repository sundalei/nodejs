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
 * Authentication middleware.
 */
var ObjectId = mongodb.ObjectID;
app.use(function (req, res, next) {
    if (req.session.loggedIn) {
        // res.local('authenticated', true); //无效语法
        res.locals.authenticated = true;
        // console.log(req.session);
        app.users.findOne({_id: ObjectId(req.session.loggedIn)}, function (err, doc) {
            if(err) {
                throw err;
            }
            res.locals.me = doc;
            next();
        });
    } else {
        // res.local('authenticated', false);
        res.locals.authenticated = false;
        next();
    }
});

/**
 * Specify your views options.
 */

app.set('view engine', 'pug');

// the following line won’t be needed in express 3
// app.set('view options', {layout : false});

/**
 * Default route
 */

app.get('/', function (req, res) {
    res.render('index');
});

/**
 * Login route
 */

app.get('/login', function (req, res) {
    res.render('login');
});

/**
 * Login process route
 */

/**
 * Login process route
 */

app.post('/login', function (req, res) {
    app.users.findOne({email: req.body.email, password: req.body.password}, function (err, doc) {
        if (err) {
            return next(err);
        }
        if(!doc) {
            return res.send('<p>User not found, Go back and try again</p>');
        }
        // console.log(doc._id.toString());
        req.session.loggedIn = doc._id.toString();
        res.redirect('/');
    });
});

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
 * Logout route
 */

app.get('/logout', function (req, res) {
    // console.log(req.session);
    req.session.loggedIn = null;
    res.redirect('/');
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
  
  // Create an index on the a field
  app.users.createIndex({email: 1, password: 1}, function (err, indexName) {
      if(err) {
          throw err;
      }
      console.log('\033[96m + \033[39m ensured indexes');
  });

  // db.close();
});

/**
 * Listen
 */

app.listen(3000, function () {
    console.log('\033[96m + \033[39m app listening on *:3000');
});