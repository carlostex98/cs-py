const express = require('express');
const route = express.Router();
var bodyParser = require('body-parser');
var html2json = require('html2json').html2json;

var result = { errores: null, copia: null, ast: null, python: null, json_x: null, html_x: null };

var parser = require('../gram');
var py_phar = require('../gram_py');
var htp = require('../ht_parser');

let aux = [];

route.get('/', function (req, res) {
    res.render('index.ejs');
});

route.post('/', function (req, res) {
    parser.clear_vars();
    var n = parser.parse(req.body.file_x);
    var ast = "";


    for (let i = 0; i < n[0].length; i++) {
        ast += n[0][i];
    }

    for (let i = 0; i < ast.length; i++) {
        ast = ast.replace(">,<", "><");
    }
    var mx = html2json(n[3]);
    //console.log();
    let r=[];
    r=req.body.file_x.split("\n");
    let err=n[1];
    for (let i = 0; i < err.length; i++) {
        err[i][4]=r[err[i][2]-1];
    }


    result = {
        errores: err,
        vars: n[2],
        ast: ast,
        python: py_phar.parse(req.body.file_x),
        json_x: JSON.stringify(mx, null, "\t"),
        html_x: n[3]
    };
    res.redirect('/cmp');
});

route.get('/cmp', function (req, res) {
    res.render('compiled.ejs', result);
});



function add_coments(texto, comm) {
    aux = [];
    var aux_2 = "";
    var x = 1;
    var y = 1;
    var n = 0;
    for (let i = 0; i < texto.length; i++) {

        if (comm[n][1] == y && comm[n][2] == x) {
            aux_2 += texto[i];
            aux.push(aux_2);
            aux.push("#" + comm[i][0]);
            n++;

        } else {
            aux_2 += texto[i];
        }

        if (texto[i] == '\n') {
            y++;
            x = 1;
        }
    }
}


module.exports = route;