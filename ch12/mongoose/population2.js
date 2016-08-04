var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, unique: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

var PostSchema = new Schema({
    poster: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    title: String,
    content: String
});

var CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    commenter: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment', CommentSchema);

mongoose.connect('mongodb://localhost/population');
var conn = mongoose.connection;

conn.on('error', function (err) {
    console.error('connection failed.');
});

conn.once('open', function () {
    User.find()
        .populate('posts', 'title', null, {sort: {title: -1}})
        .exec(function (err, doc) {
            console.log(doc[0].posts[0].title);
        });
});