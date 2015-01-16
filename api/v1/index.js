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

	router.get('/projects/:projectId/flow', requests.getFlow);
	router.get('/projects/:projectId/flow/messages', requests.getFlowMessages);
	router.get('/projects/:projectId/flow/users', requests.getFlowUsers);
	
	router.get('/projects/:projectId/pivotal', requests.getPivotalProject); //All data from one project
	router.get('/projects/:projectId/pivotal/stories', requests.getPivotalStories); //get all stories from project
	router.get('/projects/:projectId/pivotal/stories/:storyId', requests.getPivotalStory); //get one story by story id
	router.get('/projects/:projectId/pivotal/iterations', requests.getPivotalIterations);
	router.get('/projects/:projectId/pivotal/memberships', requests.getPivotalMemberships);

	router.get('/projects/:projectId/docs', requests.getGoogleDocs);

	router.use(function(err, req, res, next) {
		if (err.code == 'nonexistentproject') {
			res.status(404).send('Project does not exist');
		} else {
			next(err);
		}
	});
	
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