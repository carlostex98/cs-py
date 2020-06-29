const express = require('express');
const route = express.Router();
var bodyParser = require('body-parser');
//var jison = require('jison');
var result = { errores: null, copia: null, ast: null , py: null};
var parser = require('../gram');

route.get('/', function (req, res) {
    res.render('index.ejs');
});

route.post('/', function (req, res) {
    parser.clear_vars();
    var n = parser.parse(req.body.file_x);
    var ast="";
    
    for (let i = 0; i < n[0].length; i++) {
        ast += n[0][i];
    }
    
    for (let i = 0; i < ast.length; i++) {
        ast = ast.replace(">,<", "><");
    }

    result={errores: n[1], vars: n[2] , ast: ast , py: null};
    res.redirect('/cmp');
});

route.get('/cmp', function (req, res) {
    res.render('compiled.ejs', result);
});




module.exports = route;