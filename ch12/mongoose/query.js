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

    model.find({name: 'doraemon'})
         .where('_id').equals('57a22a694387c5cb4e0647ad')
         .exec(function (err, cat) {
             if(err) {
                 throw err;
             }
             console.log(cat);
         });
});