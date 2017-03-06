var express = require('express');
var bodyParser = require('body-parser');
var Picture = require('./db.js');
var imgCtrl = require('./imageController.js');
var app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
 
app.use(express.static('public'));

app.get('/image/get', imgCtrl.grabImages, function (req, res) {
  res.send('Get successful.');
});

app.post('/image/post', imgCtrl.newImage, function(req, res) {
  res.send(req.body);
});

app.listen(4000, function() {
  console.log('Connection to server established');
});