var express = require('express');

module.exports = (function() {

	var router = express.Router();

	router.get('/projects', function(req, res) {
		res.send([{name: 'test1'}, {name: 'test2'}]);
	});

	router.get('/projects/:projectId/applications', function(req, res) {
		res.send([{app: "flows"},
				 {app: "pivotal"},
				 {app: "docs"}]);
	});
	
	router.get('*', function (req, res) { res.status(404).send('Not Found'); });
	
	return router;
}());