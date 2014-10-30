'use strict';

// Declare app level module which depends on filters, and services

angular.module('ProjectOracle', ['ui.router']).
config(function ($urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
});