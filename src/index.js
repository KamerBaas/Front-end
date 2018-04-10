var express = require('express');
var app = express();
var path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/search', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/search.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/css/font-awesome/font-awesome.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/font-awesome/css/font-awesome.min.css'));
});

app.get('/css/fonts/:file', function(req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/font-awesome/fonts/' + req.params.file));
});

app.use('/semantic', express.static('semantic'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/semantic/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/css/font-awesome', express.static(__dirname + '/node_modules/font-awesome/dist/'));

app.use(express.static('public'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);