angular.module('App')
    .directive('currentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {
                var f1 = 'h:mm a',
                    f2 = ' d yyyy',
                    timeoutId,
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

                function updateTime() {
                    var date = new Date();
                    element.html('<h3>' + dateFilter(date, f1) + ' ' + months[date.getMonth()] + dateFilter(date, f2) + '</h3>');
                }

                updateTime();

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                timeoutId = $interval(function() {
                    updateTime(); // update DOM
                }, 3000);
            }
        };
    }]);

