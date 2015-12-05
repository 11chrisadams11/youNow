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
                    console.log('exists', exists)
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
        this.getObject = function(id, name, exists){
            return $q(function(resolve){
                var ref = new Firebase(fb.url + 'user/' + id);
                if (exists) {
                    var d = $firebaseObject(ref);  // load object from db
                    d.$loaded(function(){
                        resolve([id,d])
                    });
                } else {
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
                                }
                            },
                            news: {},
                            movies: {}
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
                                theaters: false,
                                dvd: false
                            },
                            firstTime: true
                        }
                    };
                    resolve([id, o])
                    /*ref.set(o, function () {
                        resolve(o)
                    });*/
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
            if(theme !== 'default'){
                $('head').append('<link href="css/themes/' + theme + '.css" rel="stylesheet" id="theme" data-theme="' + theme + '" />')
            }
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
        function getLoggedInUser() {
            return $q(function (resolve) {
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
                if (authObj.$getAuth()) {
                    var provider = authObj.$getAuth().provider;
                    var id = (authObj.$getAuth()[provider].id);
                    var name = (authObj.$getAuth()[provider].displayName);

                    //resolve(checkIfUserExistsInDB(id, name))
                }
            })
        }

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
        }
    });