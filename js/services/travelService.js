angular.module('App')
    .service('travelService', function ($http, $q, userService, fb, $firebaseAuth, $firebaseObject) {
    var baseUrl = 'https://maps.googleapis.com/maps/api/',
        distanceUrl = 'distancematrix/json?traffic_model=best_guess&units=imperial',
        directionsUrl = 'directions/json?traffic_model=best_guess&units=imperial&departure_time=now&origin=',
        mapUrl = 'staticmap?size=150x150&format=png&path=enc:',
        key = '&key=AIzaSyBPeQiNMIeS0KQJmnD95Rw8t8M6g9dhxHQ';

        this.getTravelInfo = function(to, from){
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

            directionsService.route(request, function(response, status) {
                var data = response.routes['0']
                console.log(data)
                console.log(data.summary, data.legs['0'].distance.text, data.legs['0'].duration.text)
            });

                /*console.log(baseUrl + directionsUrl + encodeURIComponent(from) + '&destination=' + encodeURIComponent(to) + key)
                return $q(function(resolve){
                    $http({
                        method: 'JSONP',
                        url: baseUrl + directionsUrl + encodeURIComponent(84123) + '&destination=' + encodeURIComponent(84043) + key
                    }).then(function(res){
                        console.log(res.data)
                    }, function(error){
                        console.log(error)
                    })
                })*/
        }

    });
