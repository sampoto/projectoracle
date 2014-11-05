'use strict';

// Declare app level module which depends on filters, and services

angular.module('ProjectOracle', ['ui.router']).
config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/partials/login.html'
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