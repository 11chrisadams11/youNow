angular.module('App')
.directive('newsCard', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
        },
        templateUrl: 'js/cards/newsCard.html'
    };
}]);

