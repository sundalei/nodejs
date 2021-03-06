var connect = require('connect');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');

// override with the X-HTTP-Method-Override header in the request
var app = connect();

app.use(methodOverride('X-Method-Override', {methods : ['GET', 'POST']}));

app.use(serveStatic(__dirname));

app.use(function (req, res, next) {
  if ('/resource' === req.url && 'PUT' === req.method) {
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end('{"name" : "sundalei"}');
  } else {
    next();
  }
});

app.listen(3000);
