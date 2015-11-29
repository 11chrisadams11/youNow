angular.module('App')
.directive('weatherCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/cards/weatherCard.html'
    };
}]);

