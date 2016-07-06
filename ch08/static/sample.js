'use strict';

var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use('/my-images', serveStatic(__dirname + '/images', {maxAge: 1000000000}));
app.use('/my-dotfile', serveStatic(__dirname + '/.gitignore', {dotfiles : 'deny'}));

app.listen(3000);
