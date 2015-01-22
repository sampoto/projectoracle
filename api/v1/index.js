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
 * @param config Application config
 */
module.exports = function(db, config) {

	var router = express.Router();
	var requests = Requests(db, config);

	router.all('*', requireAuthentication);
	/**
	 * @apiDescription Get all accounts, where user is authenticated to. Flowdock, Pivotal Tracker ...
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
	 * @apiParam {String} appId
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
	 * @apiDescription Create new project
	 * @apiVersion 1.0.0
	 * @apiParam {String} name
	 * @api {post} /projects CreateProject
	 * @apiName CreateProject
	 * @apiGroup Administration
	 */
	router.post('/projects', requests.createProject);
	/**
	 * @apiDescription Delete specified project
	 * @apiName DeleteProject
	 * @apiGroup Administration
	 * @apiVersion 1.0.0
	 * @apiParam {String} projectId
	 * @api {delete} /projects/:projectId DeleteProject
	 */
	router.delete('/projects/:projectId', requests.deleteProject);
	/**
	 * @apiDescription Add user to given project
	 * @apiVersion 1.0.0
	 * @apiParam {String} email
	 * @api {post} /projects/:projectId/users AddUserToProject
	 * @apiName AddUserToProject
	 * @apiGroup Administration
	 */
	router.post('/projects/:projectId/users', requests.addUserToProject);
	/**
	 * @apiDescription Delete specified project
	 * @apiName RemoveUserFromProject
	 * @apiGroup Administration
	 * @apiVersion 1.0.0
	 * @apiParam {String} projectId
	 * @apiParam {String} email
	 * @api {delete} /projects/:projectId/users/:email RemoveUserFromProject
	 */
	router.delete('/projects/:projectId/users/:email', requests.removeUserFromProject);
	
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
	 * @api {get} /projects/:projectId/flow GetFlowData
	 * @apiName GetFlowData
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow', requests.getFlow);
	/**
	 * @apiDescription Get messages from project flow
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/flow/messages GetFlowMessages
	 * @apiName GetFlowMessages
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow/messages', requests.getFlowMessages);
	/**
	 * @apiDescription Get users of project flow
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/flow/users GetFlowUsers
	 * @apiName GetFlowUsers
	 * @apiGroup FlowDock
	 */
	router.get('/projects/:projectId/flow/users', requests.getFlowUsers);
	/**
	 * @apiDescription Set Flowdock application
	 * @apiVersion 1.0.0
	 * @apiParam {String} organization
	 * @apiParam {String} flow
	 * @api {post} /projects/:projectId/applications/pivotal setFlowdockApp
	 * @apiName setFlowdockApp
	 * @apiGroup Administration
	 */
	router.post('/projects/:projectId/applications/flowdock', requests.setFlowdockApp);
	/**
	 * @apiDescription Delete Flowdock application
	 * @apiName DeleteFlowdockApp
	 * @apiGroup Administration
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId
	 * @api {delete} /projects/:projectId/applications/flowdock DeleteFlowdockApp
	 */
	router.delete('/projects/:projectId/applications/flowdock', requests.deleteFlowdockApp);
	/**
	 * @apiDescription Get user's Flowdock user information
	 * @apiVersion 1.0.0
	 * @api {get} /flowdock/user GetFlowdockUser
	 * @apiName GetFlowdockUser
	 * @apiGroup FlowDock
	 */
	router.get('/flowdock/user', requests.getFlowdockUser);
	
	/**
	 * @apiDescription Get data from one Pivotal project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal GetPivotalData
	 * @apiName GetPivotalData
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal', requests.getPivotalProject);
	/**
	 * @apiDescription Get all stories from project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal/stories GetPivotalStories
	 * @apiName GetPivotalStories
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/stories', requests.getPivotalStories);
	/**
	 * @apiDescription Get one story by story id
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 	 
	 * @apiParam {Integer} storyId 
	 * @api {get} /projects/:projectId/pivotal/stories/:storyId GetPivotalStory
	 * @apiName GetPivotalStory
	 * @apiGroup Pivotal Tracker
	 */
	router.get('/projects/:projectId/pivotal/stories/:storyId', requests.getPivotalStory);
	/**
	 * @apiDescription Get all Pivotal iterations
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/pivotal GetPivotalIterations
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
	/**
	 * @apiDescription Set Pivotal application
	 * @apiVersion 1.0.0
	 * @apiParam {String} projectId
	 * @api {post} /projects/:projectId/applications/pivotal' setPivotalApp
	 * @apiName setPivotalApp
	 * @apiGroup Administration
	 */
	router.post('/projects/:projectId/applications/pivotal', requests.setPivotalApp);
	/**
	 * @apiDescription Delete Pivotal application
	 * @apiName DeletePivotalApp
	 * @apiGroup Administration
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId
	 * @api {delete} /projects/:projectId/applications/pivotal DeletePivotalApp
	 */
	router.delete('/projects/:projectId/applications/pivotal', requests.deletePivotalApp);

	/**
	 * @apiDescription Add new Google document to given project
	 * @apiVersion 1.0.0
	 * @apiParam {String} email
	 * @api {post} /admin addAdmin
	 * @apiName addAdmin
	 * @apiGroup Administration
	 */
	router.post('/admin', requests.addAdmin);
	/**
	 * @apiDescription Delete admin
	 * @apiName DeleteAdmin
	 * @apiGroup Administration
	 * @apiVersion 1.0.0
	 * @api {delete} /admin/:email DeleteAdmin
	 */
	router.delete('/admin/:email', requests.deleteAdmin);

	/**
	 * @apiDescription Get list of google documents in given project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId 
	 * @api {get} /projects/:projectId/docs getGoogleDocs
	 * @apiName getGoogleDocs
	 * @apiGroup Google Spreadsheets
	 */
	router.get('/projects/:projectId/docs', requests.getGoogleDocs);
	/**
	 * @apiDescription Add new Google document to given project
	 * @apiVersion 1.0.0
	 * @apiParam {String} name
	 * @apiParam {String} url
	 * @api {post} /projects/:projectId/docs addGoogleDoc
	 * @apiName addGoogleDoc
	 * @apiGroup Administration
	 */
	router.post('/projects/:projectId/docs', requests.addGoogleDoc);
	/**
	 * @apiDescription Delete Google document from given project
	 * @apiVersion 1.0.0
	 * @apiParam {Integer} projectId
	 * @apiParam {Integer} docId
	 * @api {delete} /projects/:projectId/docs/:docId deleteGoogleDoc
	 * @apiName deleteGoogleDoc
	 * @apiGroup Administration
	 */
	router.delete('/projects/:projectId/docs/:docId', requests.deleteGoogleDoc);

	router.use(function(err, req, res, next) {
		if (err.code && err.code == 'nonexistentproject') {
			res.status(404).send('Project does not exist');
		} else if (err.code && err.code == 'accountnotfound') {
			res.status(404).send('Account not found');
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