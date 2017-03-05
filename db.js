var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pictureviewer');
mongoose.connection.once('open', function() {
  console.log('Connection to DB successful.');
});
mongoose.connection.on('error', function() {
  console.log('Connection to DB failed.');
});
var Schema = mongoose.Schema;

var pictureSchema = new Schema({
  title: String,
  rating: Number,
  url: String
});

var Picture = mongoose.model('Picture', pictureSchema);

module.exports.Picture = Picture;
