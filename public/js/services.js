angular.module('ProjectOracle')
.factory('AuthService', function ($rootScope, $http) {

	var authService = {};
	authService.isLoggedIn = false;
	authService.profile = {};

	$http.get('/profile').
        success(function(data){
            authService.setLoginState(true);
			authService.profile = data;
        }).error(function(data, status, headers, config) {
			authService.setLoginState(false);
			authService.profile = {};
		});

	authService.setLoginState = function(state) {
		authService.isLoggedIn = state;
		$rootScope.$broadcast('authService:loginstatus', state);
	}

	authService.isAuthenticated = function() {
		return authService.isLoggedIn;
	}

	authService.logout = function() {
		$http.post('/logout').
        success(function(data){
            authService.setLoginState(false);
        });
	}

	return authService;

})
.factory('DataFactory', ['$http', '$state', function($http, $state) {

	var dataFactory = {};
	var baseURL = "/api/v1";

	dataFactory.getProjects = function() {
		return $http.get(baseURL + '/projects');
	}
	
	dataFactory.getApplications = function(projectId) {
		return $http.get(baseURL + '/projects/' + projectId + '/applications');
	}

	dataFactory.getAccounts = function(projectId) {
		return $http.get(baseURL + '/accounts');
	}
	
	dataFactory.getGoogleDocs = function(projectId) {
		return $http.get(baseURL + '/projects/' + projectId + '/docs');
	}

	dataFactory.getPivotalProject = function(projectId) {
		return $http.get(baseURL + '/projects/' + projectId + '/pivotal');
	}

	dataFactory.getPivotalStories = function(projectId, state) {
		var stateQuery = state ? '/?with_state=' + state : '';
		return $http.get(baseURL + '/projects/' + projectId + '/pivotal/stories' + stateQuery);
	}
	
	dataFactory.getPivotalIterations = function(projectId, scope) {
		var scopeQuery = scope ? '/?scope=' + scope : '';
		return $http.get(baseURL + '/projects/' + projectId + '/pivotal/iterations' + scopeQuery);
	}
	
	dataFactory.getPivotalMemberships = function(projectId) {
		return $http.get(baseURL + '/projects/' + projectId + '/pivotal/memberships');
	}
	
	return dataFactory;
	
}])
.factory('ProjectLibrary', ['$state', '$q', 'DataFactory', function($state, $q, DataFactory) {
	var sdo = {
		getProjectData: function() {
			return $q.all([DataFactory.getProjects(), DataFactory.getAccounts()]);
		}
	};
	return sdo;
}]);
