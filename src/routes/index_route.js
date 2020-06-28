const express = require('express');
const route = express.Router();
//var jison = require('jison');

var parser = require('../gram');

route.get('/', function (req, res) {
    res.render('index.ejs');
});

route.post('/', function (req, res) {
    res.redirect('/cmp');
});

route.get('/cmp', function (req, res) {
    res.render('compiled.ejs');
});


module.exports = route;