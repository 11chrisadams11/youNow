angular.module('App', ['ui.router', 'firebase'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state('main', {
            url: "/main",
            templateUrl: "js/main/main.html",
            controller: 'mainCtrl'
        })
        .state('settings', {
            url: "/settings",
            templateUrl: "js/settings/settings.html",
            controller: 'settingsCtrl'
        });
});