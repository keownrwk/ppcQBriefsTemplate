
var express = require('express');
var path = require('path');

var app = express();



app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, '/content')));





module.exports = app;
