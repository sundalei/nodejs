/**
 * Module dependencies.
 */

var express = require('express');

/**
 * Create app.
 */

var app = express();

/**
 * Configure app.
 */

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

/**
 * Main route
 */

app.get('/', function (req, res, next) {
  res.render('index', {projects : [{id: '2', title: 'hello world'}, {id: '4', title: 'welcome'}]});
});

/**
 * Project deletion route.
 */

app.delete('/project/:id', function (req, res, next) {

});

/**
 * Project creation route.
 */

app.post('/projects', function (req, res, next) {

});

/**
 * Show tasks for project.
 */

app.get('/project/:id/tasks', function (req, res, next) {

});

/**
 * Add task for project.
 */

app.post('/project/:id/tasks', function (req, res, next) {

});

/**
 * Item route.
 */

app.delete('/task/:id', function (req, res, next) {

});

/**
 * Listen
 */

app.listen(3000, function () {
  console.log(' - listening on http://*:3000');
});
