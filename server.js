'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var config = require('./app/config');

var server = restify.createServer({
    name: config.app_name,
    version: config.app_version
});

mongoose.connect(config.database.url);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./app/routes')(server);

server.listen(config.port, function() {
    console.log('%s listening at %s port.', server.name, config.port);
});