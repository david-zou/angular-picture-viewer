
var express = require('express');
var db = require('./db');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(4000, function() {
  console.log('Connection to server established');
});

app.get('/', function(req, res){
  res.send('hello world');
});