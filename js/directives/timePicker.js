angular.module('App')
    .directive('timePicker', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            //replace: true,
            link: function link(scope, element, attrs) {
                scope.day = attrs.day;
               $(element).find('input').timepicker({
                   timeFormat: "hh:mm tt"
               }).on('change', function(){
                   $rootScope.days[scope.day][$(this).data('se')] = $(this).val();
               });
            },
            templateUrl: "js/directives/timePicker.html"
        };
    }]);