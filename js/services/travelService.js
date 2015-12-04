angular.module('App')
    .service('travelService', function ($http, $q) {

        /**
         * Get times and map info from Google based on work times
         *
         * @param usr {object} User object
         * @returns {object} Time, distance, and map object
         */
        this.getTravelInfo = function(usr){
            return $q(function(resolve){
                var user = usr,
                    travelAfterWork,
                    now = new Date(),
                    to,
                    from,
                    toName,
                    times;

                times = [user.settings.travel.days[now.getDay()].start, user.settings.travel.days[now.getDay()].end];
                times[0] = times[0] === '' ? '00:00:00 AM' : times[0];
                times[1] = times[1] === '' ? '00:00:00 AM' : times[1];

                var workStart = new Date((now.getMonth()+1) + ' ' + now.getDate() + ' ' + now.getFullYear() + ' ' + times[0]);
                var workEnd = new Date((now.getMonth()+1) + ' ' + now.getDate() + ' ' + now.getFullYear() + ' ' + times[1]);
                if(now<workStart){
                    to = user.locations.work.address;
                    from = user.locations.home.address;
                    toName = 'Work';
                    travelAfterWork = false
                } else if(workStart<now && now<workEnd){
                    to = user.locations.home.address;
                    from = user.locations.work.address;
                    toName = 'Home';
                    travelAfterWork = false
                } else if(now>workEnd){
                    travelAfterWork = true;
                    resolve({travelAfterWork: travelAfterWork})
                }

                if(!travelAfterWork) {
                    var directionsService = new google.maps.DirectionsService;
                    var request = {
                        origin: from,
                        destination: to,
                        travelMode: google.maps.TravelMode.DRIVING,
                        drivingOptions: {
                            departureTime: new Date(Date.now()),
                            trafficModel: google.maps.TrafficModel.BEST_GUESS
                        }
                    };

                    directionsService.route(request, function (response, status) {
                        var data = response.routes['0'];

                        directionsDisplay = new google.maps.DirectionsRenderer();

                        var map = new google.maps.Map(document.getElementById("map"));
                        directionsDisplay.setMap(map);

                        var trafficLayer = new google.maps.TrafficLayer();
                        trafficLayer.setMap(map);
                        directionsDisplay.setDirections(response);


                        resolve({
                            toName: toName,
                            distance: data.legs['0'].distance.text,
                            time: data.legs['0'].duration.text,
                            summary: data.summary,
                            travelAfterWork: travelAfterWork
                        })
                    });
                }
            });
        }
    });
