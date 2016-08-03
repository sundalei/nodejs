var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    title: String,
    body: String
});

var PostSchema = new Schema({
    title: String,
    body: String,
    comments: [CommentsSchema],
    meta: {
        votes: Number,
        favs: Number
    }
});

var Post = mongoose.model('BlogPost', PostSchema);

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test3');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var comments = [{title: 'comment1', body: 'body1'}, {title: 'comment2', body: 'body2'}];
    new Post({title: 'My title', body: 'Welcome to my blog', comments: comments, meta: {
        votes: 5, favs : 15
    }}).save(function (err, blogposts) {
        console.log('that was easy');
    });
});



