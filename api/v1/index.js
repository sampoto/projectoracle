/**
 * Project Oracle
 * TIE-13106 Project Work on Pervasive Systems
 * Router file for API v1
 */
var express = require('express');
var Requests = require('./requests.js');

/**
 * API v1
 * @param db Database module
 */
module.exports = function(db) {

	var router = express.Router();
	var requests = Requests(db);

	router.all('*', requireAuthentication);

	router.get('/accounts', requests.getAccounts);
	router.delete('/accounts/:appId', requests.deleteAccount);

    router.get('/projects', requests.getProjects);
    router.get('/projects/:projectId/applications', requests.getProjectApplications);

    router.get('*', function (req, res) {
        res.status(404).send('Not Found');
    });
	
	return router;
};

function requireAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send('Not authenticated');
	}
}