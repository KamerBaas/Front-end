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

app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/profile.html'));
});

app.use('/semantic', express.static('semantic'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/semantic/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(express.static('public'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);