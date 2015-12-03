angular.module('App')
    .service('travelService', function ($http, $q) {

        this.getTravelInfo = function(usr){
            return $q(function(resolve){
                var user = usr,
                    travelAfterWork,
                    now = new Date(),
                    to,
                    from,
                    toName;
                // todo: get real times for the day
                var workStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0, 0, 0);
                var workEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0, 0);
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
