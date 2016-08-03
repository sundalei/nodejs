var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var kittySchema = mongoose.Schema({
        name: String
    });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    kittySchema.methods.speak = function () {
        var greeting = this.name ? 'Meow name is ' + this.name : 'I do not have a name';
        console.log(greeting);
    }

    var Kitten = mongoose.model('Kitten', kittySchema);

    Kitten.find(function (err, kittens) {
        if (err) {
            return console.error(err);
        }
        console.log(kittens);
    });
});