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
        // TODO: Huomenta Atte! Tässä vähän miten oon jatkanut sun elämäntyötä (lähinnä team inboxin kimpussa)
        // TODO: BTW, käytän TODO-kommentteja ihan vaan niiden räikeän syntaksivärityksen takia.

        // TODO: Lisäsin sun dummy-API:in team inbox -viestejä, muokkailin tätä controlleria ja lisäksi flows.html:ää (team inbox).
        // TODO: Lisää kommentteja löytyy flows.html:stä.


        // TODO: Tämä on vaan funktio, jolla HTML-stringin saa käännettyä HTML-elementeiksi (kutsutaan flows.html:ssä).
        // TODO: Tietoturvan takia siihen pitää "luottaa" erikseen, siksi tuo $sce
        $scope.convertStringToHtml = function(htmlText) {
            return $sce.trustAsHtml(htmlText);
        };

        $http.get('/api/dapi/flow/red-wedding/messages').
        success(function(data){

            //$scope.flowChat = data;

            // TODO: Tällä koodinpätkällä erotellaan team inbox -viestit chat-viesteistä (löytyy "app":n alta,
            // TODO: "influx" = "team inbox" TÄSSÄ tapauksessa, se ei siis liity threadeihin vaikka se influx threadin
            // TODO: kommenteissa vilahtaakin)
                $scope.flowChat = [];
                $scope.teamInbox = [];

                for (var i in data) {
                    if (data[i].app == 'chat') {
                        $scope.flowChat.push(data[i]);

                    } else if (data[i].app == 'influx') {
                        $scope.teamInbox.push(data[i]);
                    }
                }

                console.log("Found chat messages: ", $scope.flowChat);
                console.log("Found team inbox messages: ", $scope.teamInbox);
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