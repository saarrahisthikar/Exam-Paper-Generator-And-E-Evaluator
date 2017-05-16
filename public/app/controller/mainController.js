//console.log('This is the main Controller');

angular.module('mainController', ['authServices', 'userServices'])

    .controller('mainController', function ($http, $location, $timeout, Auth, $route, $rootScope, $interval, $window, User, AuthToken) {
        // console.log('This is the main controller');
        var app = this;
        var loadme = false;

        // used to check whether the session is available
        app.checkSession = function () {
            if (Auth.isLoggedIn) {
                app.checkingSession = true;
                //checks the validity of the session every 2 s
                var interval = $interval(function () {
                    var token = $window.localStorage.getItem('token');
                    if (token === null) {
                        $interval.cancel(interval);//cancels the interval if there is no token
                    } else {
                        // Parse JSON Web Token using AngularJS for timestamp conversion
                        self.parseJwt = function (token) {
                            var base64Url = token.split('.')[1];
                            var base64 = base64Url.replace('-', '+').replace('_', '/');
                            return JSON.parse($window.atob(base64));
                        }

                        var expireTime = self.parseJwt(token); // Save parsed token into variable
                        var timeStamp = Math.floor(Date.now() / 1000); // Get current datetime timestamp
                        var timeCheck = expireTime.exp - timeStamp; // Subtract to get remaining time of token
                        // Check if token has less than 30 minutes till expiration
                        if (timeCheck <= 0) {
                            showModal(1); // Open bootstrap modal and let user decide what to do
                            $interval.cancel(interval); // Stop interval

                        }
                    }
                }, 2000);
            }

        }

        // checks whether the user is logged in
        app.checkSession();

        // everytime the page refreshes
        $rootScope.$on('$routeChangeStart', function () {

            if (!app.checkingSession) {
                app.checkSession();
            }
            app.isAdmin = false;
            app.isInstructor = false;
            app.isStudent = false;
            
            var loggedIn = false;
            if (Auth.isLoggedIn()) {
                app.loggedIn = true;
                console.log('user is logged in');

                // getting user details from the database
                Auth.getUser().then(function (data) {
                    console.log(data);



                    app.name = data.data.name;
                    app.userType = data.data.userType;
                    app.username = data.data.username;
                    // checking the role
                    if (app.userType == "admin") {
                        app.isAdmin = true;
                        app.loadme = true;
                    } else if (app.userType == "instructor") {
                        app.isInstructor = true;
                        app.loadme = true;
                    } else if (app.userType == "student") {
                        app.isStudent = true;
                        app.loadme = true;
                    }
                });
            } else {
                console.log('user not logged in');
                app.name = '';
                app.userType = '';
                app.loadme = true;
                app.loggedIn = false;
            }
        });

        app.checkSession(); // Ensure check is ran check, even if user refreshes

        // Function to open bootstrap modal     
        var showModal = function (option) {
            app.choiceMade = false; // Clear choiceMade on startup
            app.modalHeader = undefined; // Clear modalHeader on startup
            app.modalBody = undefined; // Clear modalBody on startup
            app.hideButton = false; // Clear hideButton on startup

            // Check which modal option to activate (option 1: session expired or about to expire; option 2: log the user out)      
            if (option === 1) {
                app.modalHeader = 'Timeout Warning'; // Set header
                app.modalBody = 'Your session will expired in 30 minutes. Would you like to renew your session?'; // Set body
                $("#myModal").modal({ backdrop: "static" }); // Open modal
                // Give user 10 seconds to make a decision 'yes'/'no'
                $timeout(function () {
                    if (!app.choiceMade) app.endSession(); // If no choice is made after 10 seconds, select 'no' for them
                }, 10000);
            } else if (option === 2) {
                app.hideButton = true; // Hide 'yes'/'no' buttons
                app.modalHeader = 'Logging Out'; // Set header
                $("#myModal").modal({ backdrop: "static" }); // Open modal
                // After 1000 milliseconds (2 seconds), hide modal and log user out
                $timeout(function () {
                    Auth.logout(); // Logout user
                    $location.path('/'); // Change route to clear user object
                    hideModal(); // Close modal
                }, 4000);

            }
        };

        // Function that allows user to renew their token to stay logged in (activated when user presses 'yes')
        app.renewSession = function () {
            app.choiceMade = true; // Set to true to stop 10-second check in option 1
            // Function to retrieve a new token for the user
            User.renewSession(app.username).then(function (data) {
                // Check if token was obtained
                if (data.data.success) {
                    AuthToken.setToken(data.data.token); // Re-set token
                    app.checkSession(); // Re-initiate session checking
                } else {
                    app.modalBody = data.data.message; // Set error message
                }
            });
            hideModal(); // Close modal
        };

        // Function to expire session and logout (activated when user presses 'no)
        app.endSession = function () {
            app.choiceMade = true; // Set to true to stop 10-second check in option 1
            hideModal(); // Hide modal
            // After 1 second, activate modal option 2 (log out)
            $timeout(function () {
                showModal(2); // logout user
            }, 1000);
        };

        // Function to hide the modal
        var hideModal = function () {
            $("#myModal").modal('hide'); // Hide modal once criteria met
        };

        // main.login(loginData);
        this.doLogin = function (loginData) {

            app.errorMsg = false;
            app.loading = false;

            //console.log('login check');

            Auth.login(app.loginData).then(function (data) {
                //console.log(data);
                if (data.data.success) {// Checks whether the login is a success
                    app.loading = false;
                    app.successMsg = data.data.message;

                    // redirects to the home page after 2s
                    $timeout(function () {
                        $location.path('/');
                        app.loginData = null;
                        app.successMsg = false;//checking whether the user is logged in
                        $route.reload();
                        app.checkSession();
                    }, 2000);

                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;

                }
            });

        };

        this.logout = function () {
            // Auth.logout();
            // $location.path('/logout');
            // $timeout(function () {
            //     $location.path('/');
            // }, 2000);


            showModal(2); // Activate modal that logs out user

        }

    });


