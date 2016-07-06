var connect = require('connect'),
    morgan = require('morgan'),
    http = require('http');

var app = connect();

app.use(morgan('type is :res[content-type], length is '
                + ':res[content-length] and it took :response-time ms.'));

app.use(function (req, res, next) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('Hello World');
});

http.createServer(app).listen(3000);
