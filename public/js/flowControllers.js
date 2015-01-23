angular.module('ProjectOracle')
    .controller('userModal', function($scope){
           
    });

angular.module('ProjectOracle')
    .directive('akModal', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.akModal, function(value) {
                    if (value) element.modal({show: true});
                    else element.modal('hide');
                });
            }
        };
});


angular.module('ProjectOracle')
    .controller('messages', function($scope, $http, $sce)
    {
        $scope.convertStringToHtml = function(htmlText) {
            return $sce.trustAsHtml(htmlText);
        };

        $http.get('/api/v1/projects/'+$scope.projectId+'/flow/messages').
        success(function(data){

            $scope.flowChat = [];
            $scope.teamInbox = [];

            for (var i in data) {
                if (data[i].app == 'chat') {
                    $scope.flowChat.push(data[i]);

                } else if (data[i].app == 'influx') {
                    $scope.teamInbox.push(data[i]);
                }
            }

        });
            

        $scope.toggleNews = function(newsId) {
            console.log(newsId);
            $("#"+newsId).toggle("slow", function () {

            });
        }

        $scope.resetFilter = function()
        {
            $scope.filter = "";
        }
        
        $scope.filterByThread = function(messageId)
        {
            
            $scope.filter = messageId;
            for(var i = 0; i < $scope.flowChat.length; i++){
               
                if($scope.flowChat[i].id == messageId){
                   
                    
                    for( var j = 0; j < $scope.flowChat[i].tags.length; i++){
                      
                        if($scope.flowChat[i].tags[j].lastIndexOf("influx:", 0) === 0 ){
                           
                            $scope.filter = $scope.flowChat[i].tags[j].substring(7);
                          
                            return;
                        }
                    }
                }
            }
           
        };
    })
    .directive('chat', function(){
        return {
            templateUrl: '/partials/msg.html'
        };
    }).directive('msginput', function(){
        return {
            templateUrl: '/partials/msginput.html'
        };
    }).directive('news', function(){
        return {
            templateUrl: '/partials/teaminbox.html'
        };
    });

function flows($scope, $http, $stateParams, $rootScope) {
	var now = Date.now() +"000";
	console.log("time now: "+ now);
	$scope.showModal = false;
	var online = [];
	var offline = [];
	$rootScope.projectId = $stateParams.projectId;
	console.log($rootScope.projectId);
	$http.get('/api/v1/projects/'+$scope.projectId+'/flow').
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