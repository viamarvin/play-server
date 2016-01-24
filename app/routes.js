'use strict';

var score = require('./controllers/scoreController');

module.exports = function(app) {
    app.get('/api/score', function(req, res, next) {
        score.getScore(req, function(e, result) {
            if (e) return res.json({status: "error", error: e});
            res.end(result);
        });
    });

    app.post('/api/score', function(req, res, next) {
        score.addScore(req, function(e, result) {
            if (e) return res.json({status: "error", error: e});

            res.json({status: "success"});
        });
    });
};