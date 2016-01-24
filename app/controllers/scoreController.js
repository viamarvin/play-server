'use strict';

var User = require('../models/User');

module.exports = {
    getScore: function(req, callback) {
        var email = req.params.email ? req.params.email : null;
        var limit = req.params.limit ? req.params.limit : 10;
        if (email) {
            User.find({email: email}).sort({createdAt: -1, score: 1}).limit(limit).exec(function(e, objects) {
                if (e) return callback(e, null);
                return callback(null, objects);
            });
        }
        else {
            User.find({}).sort({createdAt: -1, score: 1}).limit(limit).exec(function(e, objects) {
                if (e) return callback(e, null);
                return callback(null, objects);
            });
        }

        callback(null, null);
    },

    addScore: function(req, callback) {
        var errors = null;

        if (!req.params.name || req.params.name === "") {
            errors.name = "Field name is not empty";
        }

        if (!req.params.email || req.params.email === "") {
            errors.email = "Field name is not empty";
        }

        if (!req.params.score || req.params.score === "") {
            errors.score = "Field name is not empty";
        }

        if (!errors) {
            var user = new User();
            user.name = req.params.name;
            user.email = req.params.email;
            user.score = req.params.score;
            user.createdAt = new Date();

            user.save(function(e, object) {
                if (e) return callback(e, null);
                return callback(null, object);
            });
        }

        callback(errors, null);
    }
};