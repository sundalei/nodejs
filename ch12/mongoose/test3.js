var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    title: String,
    body: String,
    date: Date
});

var PostSchema = new Schema({
    _author: Schema.Types.ObjectId,
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
    var comments = [{title: 'comment1', body: 'body1', date: Date('2016-08-02')}, 
                    {title: 'comment2', body: 'body2', date: Date('2016-08-03')}];
    new Post({_author: new mongoose.Types.ObjectId, title: 'My title', 
              body: 'Welcome to my blog', comments: comments, meta: {
        votes: 5, favs : 15
    }}).save(function (err, blogposts) {
        console.log('that was easy');
    });
});



