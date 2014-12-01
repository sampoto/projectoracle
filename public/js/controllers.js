angular.module('ProjectOracle')
    .controller('headerCtrl', ['$scope', '$http', '$state', 'AuthService', 'DataFactory', function($scope, $http, $state, AuthService, DataFactory) {
        $scope.$watch(AuthService.isAuthenticated, function(loggedIn) {
            $scope.authenticated = loggedIn;
		});

		$scope.logout = function() {
			AuthService.logout();
		}

		// Get list of projects on initial page load
		DataFactory.getProjects().success(function(projects) {
			$scope.projects = projects;
		});

		$scope.projectId = '';
		$scope.$on('$stateChangeSuccess', function() {
			// When project is changed, update project applications
			if ($state.params.projectId && $scope.projectId != $state.params.projectId) {
				if ($scope.projects.filter(function(project) {
					return project.name == $state.params.projectId;
				}).length == 1) {
					$scope.projectId = $state.params.projectId;
				} else {
					$state.go('error', {title: 'Error', reason: "Project doesn't exist"});
				}
			}
		});

		// Checks if any project has been selected
		$scope.projectSelected = function() {
			if ($state.params.projectId) {
				for (var project in $scope.projects) {
					if ($state.params.projectId == $scope.projects[project].name)
						return true;
				}
			}
			return false;
		}
		
		// Navigates to given project
		$scope.selectProject = function(project) {
			$state.go( "project.index", {projectId: project.name} );
		}
    }])
	.controller('projectController', ['$scope', '$state', 'DataFactory', function($scope, $state, DataFactory) {
		function updateProjectNavigation(projectId) {
			DataFactory.getApplications(projectId).success(function(pages) {
				// Map applications to states and names
				for (page in pages) {
					pages[page].state = pages[page].app;
					pages[page].name = pages[page].app;
				}
				pages = [{state: "dashboard", name: "Dashboard"}].concat(pages);
				$scope.projectNavigation = pages;
			});
		}
		updateProjectNavigation($state.params.projectId);

		// Checks if given page is selected
		$scope.isSelected = function(page) {
			return $state.current.name == "project." + page.state 
			|| ($state.current.name == 'project.index' && page.state == 'dashboard');
		}
	}])
	.controller('errorController', ['$scope', '$state', function($scope, $state) {
		$scope.title = $state.params.title;
		$scope.reason = $state.params.reason;
	}])
	.controller('docsController', ['$scope', '$state', '$http', '$sce', function($scope, $state, $http, $sce) {
		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};
		//$rootScope.projectId = $routeParams.projectId;
		$scope.projectId = $state.params.projectId;
		$http.get('/api/dapi/docs').
			success(function(data){
				$scope.docs = data;
				$scope.defaultURL=data.docs[0].url;
			});
	}]);