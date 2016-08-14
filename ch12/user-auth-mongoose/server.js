/**
 * Module dependencies
 */
var express = require('express');
var mongoose = require('mongoose');
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
app.use(function (req, res, next) {
    if (req.session.loggedIn) {
        // res.local('authenticated', true); //无效语法
        res.locals.authenticated = true;

        User.findById(req.session.loggedIn, function (err, doc) {
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
    User.findOne({email: req.body.email, password: req.body.password}, function (err, doc) {
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

    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login/' + user.email);
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
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/my-website');

/**
 * Define Models
 */

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first: String,
    last: String,
    email: String,
    password: String
});

UserSchema.index({email: 1, password: 1});

var User = mongoose.model('User', UserSchema);

/**
 * Listen
 */

app.listen(3000, function () {
    console.log('\033[96m + \033[39m app listening on *:3000');
});
