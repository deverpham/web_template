 const express = require('express');
 var app = express();
 const path = require('path');
 app.set('views', __dirname + '/views');

 app.set('view engine', 'jsx');
 app.engine('jsx', require('express-react-views').createEngine());
 const render = require('express-react-views').createEngine()
 const res = render(path.join(__dirname, 'views/index.jsx'), Object.assign({}, app, {
     name: 'thinh',
     doctype: 'gg'
 }), function (e, b) {
     console.log(e, b)
 })