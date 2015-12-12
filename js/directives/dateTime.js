angular.module('App')
    .directive('currentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
        return {
            restrict: 'A',
            link: function link(scope, element, attrs) {
                var f1 = 'h:mm a',
                    f2 = ' d, yyyy',
                    timeoutId,
                    day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

                function updateTime() {
                    var date = new Date();
                    element.html('<h3><span id="hTime">' + dateFilter(date, f1) + '</span><span id="hDate">' + day[date.getDay()] + ', ' + months[date.getMonth()] + dateFilter(date, f2) + '</span></h3>');
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

