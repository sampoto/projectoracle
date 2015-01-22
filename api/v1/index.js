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
	/**
	 * @apiDescription Get all accounts, where user is authenticated to. Flowdoc, Pivotal Tracker ...
	 * @apiVersion 1.0.0
	 * @api {get} /accounts GetAccounts
	 * @apiName GetAccounts
	 * @apiGroup User Account
	 */
	router.get('/accounts', requests.getAccounts);
	/**
	 * @apiDescription Delete specified application from account
	 * @apiName DeleteAccount
	 * @apiGroup User Account
	 * @apiVersion 1.0.0
	 * @api {delete} /accounts/:appId DeleteAccount
	 */
	router.delete('/accounts/:appId', requests.deleteAccount);

	/**
	 * @apiDescription Get all projects related to user
	 * @apiVersion 1.0.0
	 * @api {get} /projects GetProjects
	 * @apiName GetProjects
	 * @apiGroup Projects
	 */
    router.get('/projects', requests.getProjects);
	/**
	 * @apiDescription Get all applications related to project id
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/applications' GetAllApplicationsFromProject
	 * @apiName GetAllApplicationsFromProject
	 * @apiGroup Projects
	 */
    router.get('/projects/:projectId/applications', requests.getProjectApplications);
	/**
	 * @apiDescription Get whole Flowdock flow for project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/flow'
	 * @apiName GetFlowData
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow', requests.getFlow);
	/**
	 * @apiDescription Get messages from project flow
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/flow/messages' GetFlowMessages
	 * @apiName GetFlowMessages
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow/messages', requests.getFlowMessages);
	/**
	 * @apiDescription Get users of project flow
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/flow/users' GetFlowUsers
	 * @apiName GetFlowUsers
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow/users', requests.getFlowUsers);
	
	/**
	 * @apiDescription Get data from one Pivotal project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal' GetPivotalData
	 * @apiName GetPivotalData
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal', requests.getPivotalProject);
	/**
	 * @apiDescription Get all stories from project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal/stories' GetPivotalStories
	 * @apiName GetPivotalStories
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/stories', requests.getPivotalStories);
	/**
	 * @apiDescription Get one story by story id
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 	 
	 * @apiParam {Integer} storyId 
	 * @api {get} /projects/:projectId/pivotal/stories/:storyId' GetPivotalStory
	 * @apiName GetPivotalStory
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/stories/:storyId', requests.getPivotalStory);
	/**
	 * @apiDescription Get all iterations
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal' GetPivotalIterations
	 * @apiName GetPivotalIterations
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/iterations', requests.getPivotalIterations);
	/**
	 * @apiDescription Get all memberships
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal' GetPivotalMemberships
	 * @apiName GetPivotalMemberships
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/memberships', requests.getPivotalMemberships);

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