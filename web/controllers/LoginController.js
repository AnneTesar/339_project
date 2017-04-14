angular.module('app')
.controller('LoginController', function ($scope, $location) {
    $scope.login = function(){
        $location.path("/LayoutView");
    }
});