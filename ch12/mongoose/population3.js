var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
    author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    title: String,
    body: String,
    meta: {
        votes: Number,
        favs: Number
    }
});

var AuthorSchema = new Schema({
    name: String,
    email: String,
    posts: {type: Schema.Types.ObjectId, ref: 'BlogPost'}
});

var BlogPost = mongoose.model('BlogPost', BlogPostSchema);
var Author = mongoose.model('Author', AuthorSchema);

mongoose.connect('mongodb://localhost/population3', function (err) {
    if(err) {
        throw err;
    }
    // createData();

    var conn = mongoose.connection;

    conn.on('error', function (err) {
        console.error('connection failed.');
    });

    conn.once('open', function () {
        BlogPost.find()
            .populate('author')
            .exec(function (err, doc) {
                console.log(doc[0].author[0].email);
                console.log(doc[0].author[1].email);
            });
    });
});

function createData() {
    var blogPostId = [new mongoose.Types.ObjectId];
    var authorId = [new mongoose.Types.ObjectId, new mongoose.Types.ObjectId];
    
    var blogPosts = [];
    var authors = [];
    
    blogPosts.push({
        _id: blogPostId[0],
        author: [authorId[0], authorId[1]],
        title: 'Once upon a time',
        body: 'Long long ago, Once upon a time',
        meta: {
            votes: 5,
            favs: 15
        }
    });

    authors.push({
        _id: authorId[0],
        name: 'sundalei',
        email: 'sundalei2011@163.com',
        posts: blogPostId[0]
    });

    authors.push({
        _id: authorId[1],
        name: 'sundalei',
        email: 'sundalei1988@gmail.com',
        posts: blogPostId[0]
    });

    BlogPost.create(blogPosts, function (err, docs) {
        if(err) {
            throw err;
        }
        Author.create(authors, function (err, docs) {
            console.log('create data success');
        });
    });
}