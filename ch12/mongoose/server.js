var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test');

var conn = mongoose.connection;
conn.on('error', console.error.bind('connection error: '));

conn.once('open', function () {
    var CatSchema = new mongoose.Schema({name :String});
    CatSchema.pre('save', function (next) {
        if (this.isNew) {
            console.log(this.name + ' is saved.');
            next();
        } else {
            next();
        }
        
    });

    var Cat = mongoose.model('Cat', CatSchema);

    var kitty = new Cat({name: 'kitty'});
    var doraemon = new Cat({name: 'doraemon'});
    var qiuqiu = new Cat({name: 'qiuqiu'});

    kitty.save();
    doraemon.save();
    qiuqiu.save();
});

