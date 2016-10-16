var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var serverStarter = require('server-starter');
var config = require('config');
var gitPull = require('./git-pull.js');

var app = express();
var server = http.Server(app);

serverStarter(server, config.server, (err, data) => {
  if (err) console.log('Error:', err);
  else console.log('Listening:', data);
});

app.use(bodyParser.json());

var updateEndpoints = {};

if (config.endpointsFile) {
  updateEndpoints = require(config.endpointsFile);
} else {
  console.log('Warning: No endpoints file specified. I won\'t do much without one...');
}

app.get('/update/:name/:key?', (req, res) => {
  res.send();
  var endpoint = updateEndpoints[req.params.name];
  if (endpoint) {
    if (endpoint.key && endpoint.key !== req.params.key) {
      return;
    }
    if (endpoint.type === 'git') {
      gitPull(endpoint, req.body);
    }
  }
});
