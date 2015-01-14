function pivotal($scope, $state, $http, DataFactory) {
	DataFactory.getPivotalProject($scope.projectId).
		success(function(data){
			$scope.pivotalProject = data;
		});

	// Get all the icebox stories (current_state: 'unscheduled')
	DataFactory.getPivotalStories($scope.projectId, 'unscheduled').
		success(function(data){
			$scope.iceboxStories = data;
		});

	// Current iterations
	DataFactory.getPivotalIterations($scope.projectId, 'current').
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
	DataFactory.getPivotalIterations($scope.projectId, 'backlog').
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
	DataFactory.getPivotalMemberships($scope.projectId).
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
					$scope.projectId = "";
				}
			}
		});
		
		// Navigates to given project
		$scope.selectProject = function(project) {
			$state.go( "project.index", {projectId: project.name} );
		}
    }])
	.controller('projectController', ['$scope', '$state', 'DataFactory', 'projects', function($scope, $state, DataFactory, projects) {
		function updateProjectNavigation(projectId) {
			DataFactory.getApplications(projectId).success(function(pages) {
				// Map applications to states and names
				for (page in pages) {
					pages[page].state = pages[page].id;
					pages[page].name = appName(pages[page].id);
				}
				pages = [{state: "dashboard", name: "Dashboard"}].concat(pages);
				$scope.projectNavigation = pages;
			});
		}

		function appName(appId) {
			if (appId == "flowdock") return "Flowdock";
			if (appId == "pivotal") return "Pivotal tracker";
			if (appId == "googledocs") return "Google spreadsheets";
		}

		var search = projects.data.filter(function(project) {
			return $state.params.projectId == slugify(project.name);
		});
		if (search.length > 0) {
			// This id is used in API calls
			$scope.projectId = search[0].id;
		} else {
			$state.go('error', {title: 'Error', reason: "Project doesn't exist"});
		}

		updateProjectNavigation($scope.projectId);

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
	.controller('docsController', ['$scope', '$state', '$http', '$sce', 'DataFactory', function($scope, $state, $http, $sce, DataFactory) {
		$scope.defaultURL = null;
		$scope.imageUrl = function(src) {
			if (src) return $sce.trustAsResourceUrl(src);
			return '';
		};
		DataFactory.getGoogleDocs($scope.projectId).
			success(function(data){
				$scope.docs = data;
				if (data.length > 0) {
					$scope.defaultURL = data[0].url;
				}
			});
	}])
	.controller('pivotalController', ['$scope', '$state', '$http', 'DataFactory', function($scope, $state, $http, DataFactory) {
		pivotal($scope, $state, $http, DataFactory);
	}]);	
// Thanks to Mathew Byrne
// https://github.com/mathewbyrne
function slugify(text) {
	return text.toString().toLowerCase()
	.replace(/\s+/g, '-') // Replace spaces with -
	.replace(/[^\w\-]+/g, '') // Remove all non-word chars
	.replace(/\-\-+/g, '-') // Replace multiple - with single -
	.replace(/^-+/, '') // Trim - from start of text
	.replace(/-+$/, ''); // Trim - from end of text
}
