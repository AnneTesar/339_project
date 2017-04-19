angular.module('app')
.controller('LoginController', function ($scope, $location, $http) {
    $scope.login = function(){
        var valid = true;
        if($scope.username == null) {
            $("#username_alert").show();
            valid = false;
        }
        else {
            $("#username_alert").hide();
        }
        if($scope.password == null) {
            $("#blank_password_alert").show();
            valid = false;
        }
        else {
            $("#blank_password_alert").hide();
        }
        if (valid) {
            var request = $http({
                method: "post",
                url: "php/login.php",
                data: {
                    username: $scope.username,
                    password: $scope.password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data) {
                if (data == "Failed") {
                    $("#invalid_login_alert").show();
                }
                else if (data == "Success") {
                    $location.path("/LayoutView");
                }
            }).error(function (data) {
                console.log("error");
            });
        }
    }

    $scope.createAccount = function(){
        $location.path("/CreateAccountView");
    }
});