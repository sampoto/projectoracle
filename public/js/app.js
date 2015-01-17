'use strict';

// Declare app level module which depends on filters, and services

angular.module('ProjectOracle', ['ui.router']).
config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/partials/login.html'
	}).state('main', {
		url: '/'
	}).state('project', {
		abstract: true,
		controller: 'projectController',
		url: '/p/:projectId',
		templateUrl: '/partials/project.html',
		resolve: {
			projectData: function(ProjectLibrary) { return ProjectLibrary.getProjectData(); }
		}
	}).state('project.index', {
		url: '',
		templateUrl: '/partials/dashboard.html'
    }).state('project.dashboard', {
		url: '/dashboard',
		templateUrl: '/partials/dashboard.html'
	}).state('project.flowdock', {
		url: '/flowdock',
		templateUrl: '/partials/flows.html'
	}).state('project.pivotal', {
		url: '/pivotal',
		controller: 'pivotalController',
		templateUrl: '/partials/pivotal.html'
	}).state('project.googledocs', {
		url: '/googledocs',
		controller: 'docsController',
		templateUrl: '/partials/docs.html'
	}).state('project.error', {
		templateUrl: '/partials/error.html',
		controller: 'errorController',
		params: {projectId:{}, title:{}, reason:{}}
	}).state('error', {
		templateUrl: '/partials/error.html',
		controller: 'errorController',
		params: {title:{}, reason:{}}
	});
    $urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
})
.run(["$rootScope", "$state", "AuthService", function($rootScope, $state, AuthService) {
	// Redirect to login page if the user isn't logged in
	$rootScope.$on('authService:loginstatus', function(event, loggedIn) {
		if (!loggedIn) {
			$state.go("login");
		}
	});
}]);