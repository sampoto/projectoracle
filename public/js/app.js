'use strict';

// Declare app level module which depends on filters, and services

angular.module('ProjectOracle', ['ngRoute']).
config(function ($routeProvider, $locationProvider) {
	$routeProvider.otherwise({
		redirectTo: '/index'
    });

	$locationProvider.html5Mode(true);
});