'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var config = require('./app/config');
var routes = require('./app/routes');

var server = restify.createServer({
    name: config.app_name,
    version: config.app_version
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(routes);
server.listen(config.port, function() {
    console.log('%s listening at %s port.', server.name, config.port);
});