angular.module('App', ['ui.router', 'firebase', 'ngAutocomplete', 'ngAnimate'])
.constant('fb', {
    url: 'https://younow.firebaseio.com/'
})
.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
.filter('orderByKey', function () {
    return function (input) {
        if (!angular.isUndefined(input)) {
            var tmpInput = [];
            angular.forEach(input, function (value, key) {
                tmpInput.push(key);
            });
            tmpInput.sort();

            var tmpOutput = [];
            angular.forEach(tmpInput, function (key) {
                tmpOutput.push(input[key]);
            });
            return tmpOutput;
        } else {
            return input;
        }
    }
})
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");
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
        })
        .state('login', {
        url: "/login",
        templateUrl: "js/login/login.html",
        controller: 'loginCtrl'
    });
});