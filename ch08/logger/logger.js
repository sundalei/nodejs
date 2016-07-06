var connect = require('connect'),
    morgan = require('morgan'),
    http = require('http');

var app = connect();

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('Hello World');
});

http.createServer(app).listen(3000);
