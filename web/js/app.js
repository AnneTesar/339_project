var app = angular.module('app', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider.when("/LayoutView", {
        controller: "LayoutController",
        templateUrl: "views/LayoutView.html"
    });
    $routeProvider.when("/LoginView", {
        controller: "LoginController",
        templateUrl: "views/LoginView.html"
    });
    $routeProvider.when("/CreateAccountView", {
        controller: "CreateAccountController",
        templateUrl: "views/CreateAccountView.html"
    });
    $routeProvider.when("/NewLayoutView", {
        controller: "NewLayoutController",
        templateUrl: "views/NewLayoutView.html"
    });
    $routeProvider.otherwise({
      redirectTo: "/LoginView"
    });
});




