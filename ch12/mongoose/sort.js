var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');
var conn = mongoose.connection;

conn.on('error', function () {
    console.error('connection failed.');
});

conn.once('open', function () {
    var schema = new Schema({name: String});
    var model = mongoose.model('Cat', schema);

    model.count(function (err, total) {
        console.log(total);
    });

    model.find()
         .sort({'name': -1})
         .skip(3)
         .limit(8)
         .exec(function (err, cat) {
             if(err) {
                 throw err;
             }
             console.log(cat);
         });
});