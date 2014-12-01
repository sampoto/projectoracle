var express = require('express');

var dummyDocs={
	"docs": [
		{
			"type":"slides",
			"url" :"https://docs.google.com/presentation/d/1HqLpL1lkOrtoxEIFRwu7UbCEUfUvalSEP7GnT5MKvLc/embed?start=false&loop=true&delayms=60000",
			"name":"requirement"
		},
		{
			"type":"spreadsheet",
			"url" :"https://docs.google.com/spreadsheets/d/1rFUSxn6kGnBhm7CYHeT8bqf5NxwdwmQy_s8QQ1I3HdA/pubhtml?widget=true&amp;headers=false",
			"name":"hourlog"
		},
		{
			"type":"doc",
			"url" :"https://docs.google.com/document/d/11y7LI3swGBDdzJWzOQ3kA88sIi5RFVDAZ_eBuhwDku4/pub?embedded=true",
			"name":"questions for futurice"
		},
		{
			"type":"spreadsheet",
			"url" :"https://docs.google.com/spreadsheets/d/1KuzTYVn-pc9PzI387Q7HpbkZGvJ0xfwxq82LzMGt5S0/pubhtml?widget=true&amp;headers=false",
			"name":"dummy spreadsheet"
		}

	]
}

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

	router.get('/docs', function(req, res) {
		res.json(dummyDocs);
	});

	router.get('*', function (req, res) { res.status(404).send('Not Found'); });

	return router;
}());