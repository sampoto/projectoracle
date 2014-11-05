angular.module('ProjectOracle')
    .controller('headerCtrl', ['$scope', '$http', '$state', 'AuthService', function($scope, $http, $state, AuthService) {
		$scope.$watch(AuthService.isAuthenticated, function(loggedIn) {
			$scope.authenticated = loggedIn;
		});
		$scope.logout = function() {
			$http.get('/logout').
				success(function(data) {
					AuthService.setLoginState(false);
					$state.go("login");
				});
		}
	}]);