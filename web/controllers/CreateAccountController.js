angular.module('app')
.controller('CreateAccountController', function ($scope, $location) {
    $scope.createAccount = function(){
        $location.path("/LayoutView");
    }
});