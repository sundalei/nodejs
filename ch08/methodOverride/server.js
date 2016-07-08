var connect = require('connect');
var methodOverride = require('method-override');

// override with the X-HTTP-Method-Override header in the request
var app = connect();

//app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function (req, res, next) {
  if ('/resource' === req.url && 'GET' === req.method) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>Hello World</h1>');
  }
});

app.listen(3000);
