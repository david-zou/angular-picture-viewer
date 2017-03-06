// imgCtrl
var Picture = require('./db');

module.exports = {
  newImage: function(req, res, next) {
    var url = req.body.url;
    Picture.find({url: url}, function(img) {
      if (img) {
        next(new Error('Image already exists!'));
      } else {
        Picture.create(req.body, function(err) {
          if(err) {
            console.log('Cannot post picture to database:', err);
          }
          console.log('Posted: ', req.body);
          next();
        });
      }
    });
  },

  grabImages: function(req, res, next) {
    Picture.find({}, function(err, images) {
      if (err) {
        next(new Error('Cannot get images from database!'));
      } else {
        console.log('Images received.');
        res.json(images)
      }
    });
  }
};