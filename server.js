/**
 * Project Oracle
 * TIE-13106 (TIE-13100) Project Work on Pervasive Systems
 */

var fs = require('fs');
var express = require('./node_modules/express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Load config if exists
var config = {};
var configFile = './config.js';
if (fs.existsSync(configFile)) {
    config = require(configFile);
}

// Envinronment settings
app.set('port', (config.port || process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});