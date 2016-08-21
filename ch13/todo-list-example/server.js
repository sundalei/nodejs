/**
 * Module dependencies.
 */

var express = require('express'),
    Sequelize = require('sequelize'),
    bodyParser = require('body-parser');

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
 * Middleware
 */

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Initialize sequelize
 */

var sequelize = new Sequelize('todo-example', 'root', 'root');

sequelize.authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

var Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  created: Sequelize.DATE
});

/**
 * Define tasks model
 */

var Task = sequelize.define('Task', {
  title: Sequelize.STRING
});

/**
 * Set up Connection
 */

Task.belongsTo(Project);
Project.hasMany(Task);

/**
 * Sync
 */

sequelize.sync({force: true});

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
  Project.build(req.body).save().then(function (obj) {
    res.send(obj);
  }).catch(next);
});

/**
 * Show tasks for project.
 */

app.get('/project/:id/tasks', function (req, res, next) {
  res.render('tasks', {project: {id: 1, title: 'hello'}, tasks: [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}]});
});

/**
 * Add task for project.
 */

app.post('/project/:id/tasks', function (req, res, next) {
  req.body.ProjectId = req.params.id;
  Task.build(req.body).save().then(function (obj) {
    res.send(obj);
  }).catch(next);
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
