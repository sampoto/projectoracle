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

});