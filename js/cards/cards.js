angular.module('App')
.directive('travelCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/cards/travelCard.html'
    };
}])
.directive('newsCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/cards/newsCard.html'
    };
}])
.directive('weatherCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/cards/weatherCard.html'
    };
}]);

