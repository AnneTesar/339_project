angular.module('app')
.controller('CreateAccountController', function ($scope, $location, $window, $http) {
    $scope.createAccount = function(){
        url='http://localhost/reg/far_submit.php';
        var valid = true;
        if($scope.username == null) {
            $("#username_alert").show();
            valid = false;
        }
        else {
            $("#username_alert").hide();
        }
        if($scope.password == null || $scope.confirm == null) {
            $("#blank_password_alert").show();
            valid = false;
        }
        else {
            $("#blank_password_alert").hide();
        }
        if($scope.password != $scope.confirm) {
            $("#no_match_alert").show();
            valid = false;
        }
        else {
            $("#no_match_alert").hide();
        }
        if (valid) {
            var request = $http({
                method: "post",
                url: "php/createAccount.php",
                data: {
                    username: $scope.username,
                    password: $scope.password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                if (data == "Failed") {
                    $("#username_taken_alert").show();
                }
                else if (data == "Success") {
                    $location.path("/LayoutView");
                }
            }).error(function (data) {
                console.log("error");
            });
        }
    }
});