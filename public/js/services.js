angular.module('ProjectOracle')
.factory('AuthService', function ($rootScope, $http) {

	var authService = {};
	authService.isLoggedIn = false;

	$http.get('/loggedin').
        success(function(data){
            authService.setLoginState(data != "" ? true : false);
        });

	authService.setLoginState = function(state) {
		authService.isLoggedIn = state;
		$rootScope.$broadcast('authService:loginstatus', state);
	}

	authService.isAuthenticated = function() {
		return authService.isLoggedIn;
	}

	return authService;

})
.factory('DataFactory', ['$http', '$state', function($http, $state) {

	var dataFactory = {};
	var baseURL = "/api/dapi";

	dataFactory.getProjects = function() {
		return $http.get(baseURL + '/projects');
	}
	
	dataFactory.getApplications = function(projectId) {
		return $http.get(baseURL + '/projects/' + projectId + '/applications');
	}
	
	return dataFactory;
	
}])
.factory('ProjectLibrary', ['$state', 'DataFactory', function($state, DataFactory) {
	var sdo = {
		getApplications: function() {
			var projectId = $state.params.projectId;
			return DataFactory.getApplications(projectId);
		}
	};
	return sdo;
}]);
