var express = require('express');
var app = express();
var path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const PORT = 8080;
const SPORT = 4330;
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
app.use('/node_modules/semantic-ui-calendar/', express.static(__dirname + '/node_modules/semantic-ui-calendar/'));

app.use(express.static('public'));

const options = {
    cert: fs.readFileSync(__dirname + '/ssl/kamerbaas.nl/fullchain.pem'),
    key: fs.readFileSync(__dirname + '/ssl/kamerbaas.nl/privkey.pem'),
    ca: fs.readFileSync(__dirname + '/ssl/kamerbaas.nl/chain.pem')
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(PORT, HOST);
httpsServer.listen(SPORT, HOST);

//app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);