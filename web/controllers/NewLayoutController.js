angular.module('app')
.controller('NewLayoutController', function ($scope, $location) {
    $scope.createLayout = function(){
        $location.path("/LayoutView");
    }
});