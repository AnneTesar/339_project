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
    $routeProvider.otherwise({
      redirectTo: "/LoginView"
    });
});




