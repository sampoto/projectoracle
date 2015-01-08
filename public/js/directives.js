angular.module('ProjectOracle')
    .directive('akModal', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.akModal, function(value) {
                    if (value) $("#userList").modal('show');
                    else $("#userList").modal('hide');
                });
            }
        };
});