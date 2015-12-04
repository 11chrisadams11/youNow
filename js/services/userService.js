angular.module('App')
    .service('userService', function ($http, $firebaseObject, $firebaseAuth, $firebaseArray, fb, $state, $q, $location) {
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
        function checkIfUserExistsInDB(id, name) {
            return $q(function (resolve) {
                var ref = new Firebase(fb.url + 'user/' + id);
                ref.once("value", function (snapshot) {
                    var exists = (snapshot.val() !== null); //if user id in DB
                    if (exists) {
                        var d = $firebaseObject(ref);
                        resolve(d)
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
                                news: {}
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
                                firstTime: true
                            }
                        };
                        ref.set(o, function () {
                            resolve(o)
                        });
                    }
                })
            })
        }

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

                    checkIfUserExistsInDB(id, name).then(function (u) {
                        resolve(u)
                    })
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
            return $q(function(resolve){
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
                authObj.$authWithOAuthPopup(service).then(function (authData) {
                    var id = (authData[authData.provider].id);
                    var name = (authData[authData.provider].displayName);
                    //authObj = $firebaseAuth(new Firebase(fb.url + 'user/' + id));
                    checkIfUserExistsInDB(id, name).then(function (u) {
                        user = u;
                        resolve(user)
                    });
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                    $state.go('login')
                });
            })
        };
    });