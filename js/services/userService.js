angular.module('App')
    .service('userService', function ($http, $firebaseObject, $firebaseAuth, $firebaseArray, fb, $state, $q, $timeout) {
        var user = {};
        var authObj;

        /**
         * Set local user object from $scope.user
         * @param u {object} $scope.user object
         */
        this.setUserData = function(u){
            user = u
        };

        /**
         * Checks if user object is empty, if so get logged in user info, else return stored user
         * @returns {object} Return user object
         */
        this.getUserData = function () {
            return $q(function (resolve) {
                if (Object.keys(user).length === 0) { //If user var is empty, get logged in info
                    getLoggedInUser().then(function (u) {
                        user = u;
                        resolve(user)
                    });
                } else {
                    resolve(user)
                }
            })
        };

        /**
         * Check if user id is in database
         *
         * @param id {number} Id number of logged in user
         * @param name {string} Name of logged in user
         * @returns {object} Return saved or empty user object
         */
        this.checkIfUserExistsInDB = function(id, name) {
            return $q(function(resolve){
                var ref = new Firebase(fb.url + 'user/');
                ref.once("value", function (snapshot) {
                    var exists = (snapshot.child(id).exists()); //if user id in DB
                    resolve([id, name, exists])
                })
            })
        };

        /**
         * If user exists in DB return that object, else return empty object
         *
         * @param id {number} User id number
         * @param name {string} User name
         * @param exists {boolean} Does user exist in DB
         * @returns {object} User object
         */
        this.setEmptyObject = function(id, name, exists){
            return $q(function(resolve){
                var ref = new Firebase(fb.url + 'user/' + id);
                if (!exists) {
                    var o = { // create empty user if not in DB
                        name: name,
                        locations: {
                            home: {
                                address: '',
                                weatherUpdates: true
                            },
                            work: {
                                address: '',
                                weatherUpdates: true
                            }
                        },
                        data: {
                            weather: {
                                home: {
                                    icon: '',
                                    quick: '',
                                    full: ''
                                },
                                work: {
                                    icon: '',
                                    quick: '',
                                    full: ''
                                },
                                local: {
                                    icon: '',
                                    quick: '',
                                    full: ''
                                },
                                updated: 0
                            },
                            news: {
                                updated: 0
                            },
                            movies: {
                                theater:{updated: 0},
                                dvd:{updated: 0}
                            }
                        },
                        settings: {
                            news: {
                                updates: false
                            },
                            weather: {
                                updates: true
                            },
                            travel: {
                                updates: false
                            },
                            movies: {
                                theater: false,
                                dvd: false
                            },
                            theme: 'default',
                            firstTime: true
                        }
                    };
                    ref.set(o);
                }
                resolve(id)
            })
        };

        this.getUserObj = function(id){
            return $q(function(resolve){
                if(Object.keys(user).length === 0) {
                    var ref = new Firebase(fb.url + '/user/' + id);
                    var obj = $firebaseObject(ref);
                    user = obj;
                    resolve(obj)
                } else {
                    resolve(user)
                }
            })
        };

        /**
         * Set saved theme on reload or login
         *
         * @param theme {string} Name of saved theme
         */
        this.setTheme = function(theme){
            var $theme = $('#theme');
            if($theme.length !== 0){
                $theme.remove()
            }

            var bgColors = {default: '#ffffff', dark: '#353535', blue: '#e4e4e4', orange: '#fceecf', simple: '#ffffff'},
                headerColors = {default: '#e3eeee', dark: '#1f1f1f', blue: '#3f51b5', orange: '#e6901c', simple: '#ffffff'},
                bgFontColors = {default: '#000000', dark: 'whitesmoke', blue: '#282828', orange: '#282828', simple: '#000000'},
                headerFontColors = {default: '#000000', dark: 'whitesmoke', blue: '#FFFFFF', orange: '#212121', simple: '#000000'},
                shadow = {default: '0 0 0 0', dark: '0 0 0 0', blue: '0 3px 8px rgba(0,0,0,0.5)', orange: '0 3px 8px rgba(0,0,0,0.5)', simple: '0 0 0 0'},
                cardColors = {default: '#ffffff', dark: '#1d1d1d', blue: '#ffffff', orange: 'white', simple: '#ffffff'},
                cardFontColors = {default: '#000000', dark: 'whitesmoke', blue: '#282828', orange: '#282828', simple: '#000000'},
                nameColors = {default: '#fbfbfb', dark: '#1f1f1f', blue: '#03a9f4', orange: '#ff5722', simple: '#ffffff'},
                nameFontColors = {default: '#000000', dark: 'whitesmoke', blue: 'whitesmoke', orange: 'whitesmoke', simple: '#000000'};

            if(theme !== 'default'){
                $('body').animate({
                    'background-color': bgColors[theme],
                    'color': bgFontColors[theme]
                });
                $('.card').animate({
                    'background-color': cardColors[theme],
                    'color': cardFontColors[theme]
                });
                $('.name').animate({
                    'background-color': nameColors[theme],
                    'color': nameFontColors[theme]
                });
                $('#header').animate({
                    'background-color': headerColors[theme],
                    'color': headerFontColors[theme],
                    'box-shadow': shadow[theme]
                }, function () {
                    $('head').append('<link href="css/themes/' + theme + '.css" rel="stylesheet" id="theme" data-theme="' + theme + '" />')
                });
            }
           /* if(theme !== 'default'){
                $('head').append('<link href="css/themes/' + theme + '.css" rel="stylesheet" id="theme" data-theme="' + theme + '" />')
            }*/
        };

        /**
         * Log user out when button is clicked
         */
        this.logout = function () {
            authObj.$unauth();
            user = {};
            $state.go('login');
        };

        /**
         * Check if user is logged in
         *
         * @returns {object} User object
         */
        this.getLoggedInUser = function() {
            return $q(function (resolve) {
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
                if (authObj.$getAuth()) {
                    var provider = authObj.$getAuth().provider;
                    var id = (authObj.$getAuth()[provider].id);
                    var name = (authObj.$getAuth()[provider].displayName);
                    resolve([id, name])
                }
            })
        };

        /**
         * Log user in with selected service, else throw error
         *
         * @param service {string} Service name
         * @returns {object} User object from database
         */
        this.loginWith = function (service) {
            return $q(function (resolve) {
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
                authObj.$authWithOAuthPopup(service)
                    .then(function (authData) {
                        var id = (authData[authData.provider].id);
                        var name = (authData[authData.provider].displayName);
                        resolve([id, name])
                    })
                    .catch(function (error) {
                        console.error("Authentication failed:", error);
                        $state.go('login')
                    });
            });
        };

        this.getLocation = function(){
            return $q(function(resolve){
                navigator.geolocation.getCurrentPosition(function (position) {
                    var loc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(loc)
                });
            })
        }
    });