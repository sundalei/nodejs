var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', {name : String});

var kitty = new Cat({name : 'SunDalei'});
kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('haha');
    }
});