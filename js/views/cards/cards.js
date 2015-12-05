angular.module('App')
.directive('travelCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/views/cards/travelCard.html'
    };
}])
.directive('newsCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/views/cards/newsCard.html'
    };
}])
.directive('weatherCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/views/cards/weatherCard.html'
    };
}])
.directive('moviesCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/views/cards/moviesCard.html'
    };
}]);

