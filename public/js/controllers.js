function pivotal($scope, $state, $http) {
	$scope.projectId = $state.params.projectId;
	$http.get('/api/dapi/pivotal/project').
		success(function(data){
			$scope.pivotalProject = data;
		});

	// Get all the icebox stories (current_state: 'unscheduled')
	$http.get('/api/dapi/pivotal/stories/unscheduled').
		success(function(data){
			$scope.iceboxStories = data;
		});

	// Current iterations
	$http.get('/api/dapi/pivotal/iterations/current').
		success(function(data){
			// Calculate total estimates for all iterations
			for(var iterationKey in data) {
				var totalPoints = 0;
				var donePoints = 0;
				var iteration = data[iterationKey];
				for(var storyKey in iteration.stories) {
					var story = iteration.stories[storyKey];
					totalPoints += story.estimate ? story.estimate : 0;
					console.log("Story '" + story.name + "' has state " + story.current_state);

					if(story.current_state == 'accepted') {
						donePoints += story.estimate ? story.estimate : 0;
					}

				}

				data[iterationKey].totalPoints = totalPoints;
				data[iterationKey].donePoints = donePoints;
			}
			$scope.currentIterations = data;
		});

	// Backlog iterations
	$http.get('/api/dapi/pivotal/iterations/backlog').
		success(function(data){
			for(var iterationKey in data) {
				var totalPoints = 0;
				var iteration = data[iterationKey];
				for(var storyKey in iteration.stories) {
					var story = iteration.stories[storyKey];
					totalPoints += story.estimate ? story.estimate : 0;
				}
				data[iterationKey].totalPoints = totalPoints;
			}
			$scope.backlogIterations = data;
		});

	// Get memberships for owner information
	$http.get('/api/dapi/pivotal/memberships').
		success(function(data){
			// We don't need actual membership data, only the person resources inside
			var persons = [];
			for (var membershipKey in data) {
				var membership = data[membershipKey];
				var person = membership.person;

				persons[person.id] = person;
			}

			$scope.persons = persons;
		});
}

function flows($scope, $http, $stateParams, $rootScope) {
    var now = Date.now() +"000";
    console.log("time now: "+ now);
    $scope.showModal = false;
    var online = [];
    var offline = [];
    $rootScope.projectId = $stateParams.projectId;
    console.log($rootScope.projectId);
    $http.get('/api/dapi/flows').
        success(function(data){
            $scope.flows = data;
        });
    $http.get('/api/dapi/name').
        success(function(data){
            $scope.user = data;
        });
    $http.get('/api/dapi/flow/12345').
        success(function(data){
            $scope.flow = data;
            var lookup = {};
            for (var i = 0, len = $scope.flow.users.length; i < len; i++) {
                lookup[$scope.flow.users[i].id] = $scope.flow.users[i];
            }
            $scope.userLookup = lookup;
            
            for(var i = 0; i < data.users.length; i++)
            {
                if(data.users[i].last_ping > now )
                {
                    online.push(data.users[i]);
                    console.log("user online: "+ data.users[i].nick +" with timestamp: " + data.users[i].last_ping);
                }
                else
                {
                    offline.push(data.users[i]);
                    console.log("user offline: "+ data.users[i].nick +" with timestamp: " + data.users[i].last_ping);
                }
            }
        });
        $scope.offline = offline;
        $scope.online = online;
    
}

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
		$scope.projectId = $state.params.projectId;
		$http.get('/api/dapi/docs').
			success(function(data){
				$scope.docs = data;
				$scope.defaultURL = data.docs[0].url;
			});
	}])
	.controller('pivotalController', ['$scope', '$state', '$http', function($scope, $state, $http) {
		pivotal($scope, $state, $http);
	}])
	.controller('flows', function ($scope, $http, $stateParams, $rootScope) {
        flows($scope, $http, $stateParams, $rootScope);
    });