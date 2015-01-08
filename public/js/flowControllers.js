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
    .controller('messages', function($scope, $http)
    {
        $http.get('/api/dapi/flow/red-wedding/messages').
        success(function(data){
            
            $scope.flowChat = data;
        });
            
            
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
    });