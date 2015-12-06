angular.module('App')
    .service('weatherService', function ($http, $q, userService, fb, $firebaseAuth, $firebaseObject) {
        var url = 'http://api.wunderground.com/api/c5e9d80d2269cb64/conditions/forecast10day/';

        this.getCurrentWeather = function(user) {
            return $q(function (resolve) {
                var w = {},
                    promises = [];

                for (var i in user.locations) {
                    (function (e) {
                        if (user.locations.hasOwnProperty(e)) {
                            if (user.locations[e].address !== '' && user.locations[e].weatherUpdates) {
                                var zip;
                                if (user.locations[e].address.length === 5) {
                                    zip = user.locations[e].address
                                } else {
                                    zip = user.locations[e].address.split(' ')[user.locations[e].address.split(' ').length - 2].replace(',', '');
                                }
                                var res = goGet(zip, e).then(function(ww){
                                    return [[ww[0]], {quick: ww[1], full: ww[2], icon: ww[3]}]
                                });
                                promises.push(res);

                            }
                        }
                    })(i)
                }

                var res = goGet('local', 'local').then(function(ww){
                    return [[ww[0]], {quick: ww[1], full: ww[2], icon: ww[3]}]
                });
                promises.push(res);

                $q.all(promises).then(function(val){
                    val.forEach(function(e){
                        w[e[0]] = e[1]
                    });
                    w.updated = Date.now();
                    user.data.weather = w;
                    resolve(w)
                });
            })
        };


        function goGet(where, name) {
            return $q(function (resolve) {
                getLocation(where).then(function (url) {
                    getWeather(url, name).then(function (weather) {
                        resolve(weather);
                    })
                });
            })

        }

        function getLocation(where) {
            return $q(function (resolve) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                });
            }).then(function (res) {
                var url2;
                if (where === 'local') {
                    url2 = url + 'geolookup/q/' + res.lat + ',' + res.lon + '.json'
                } else {
                    url2 = url + 'q/' + where + '.json'
                }
                return url2
            })
        }

        function getWeather(url, name) {
            return $http({
                method: 'GET',
                //url: 'weather.json'
                url: url
            }).then(function (res) {
                var curr = res.data.current_observation,
                    fore = res.data.forecast,
                    tempHigh = [],
                    icon = [],
                    day = [],
                    tempLow = [];
                for(var i = 1; i<6; i++){
                    tempHigh.push(fore.simpleforecast.forecastday[i].high.fahrenheit);
                    tempLow.push(fore.simpleforecast.forecastday[i].low.fahrenheit);
                    icon.push(fore.simpleforecast.forecastday[i].icon_url);
                    day.push(fore.simpleforecast.forecastday[i].date.weekday_short);
                }

                return [name, {
                    location: curr.display_location.city + ', ' + curr.display_location.state,
                    temp: Math.round(curr.temp_f) + '°',
                    weather: curr.weather
                },
                {
                    forecastTemp: tempHigh,
                    forecastTempLow: tempLow,
                    forecastIcon: icon,
                    forecastDay: day
                }, curr.icon_url];
            })
        }
    });
