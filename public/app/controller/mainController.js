//console.log('This is the main Controller');

angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function ($http, $location, $timeout, Auth, $rootScope) {
        // console.log('This is the main controller');
        var app = this;
        var loadme = false;
        var loggedIn = false;

        // everytime the page refreshes
        $rootScope.$on('$routeChangeStart', function () {

            if (Auth.isLoggedIn()) {
                app.loggedIn = true;
                console.log('user is logged in');
                Auth.getUser().then(function (data) {
                    console.log(data);
                    app.username = data.data.username;
                    app.userType= data.data.userType;
                    app.loadme = true;
                });
            } else {
                console.log('user not logged in');
                app.username = '';
                app.userType = '';
                app.loadme = true;
                app.loggedIn = false;
            }
        });

        // main.login(loginData);
        this.doLogin = function (loginData) {
            app.errMsg = false;
            app.loading = false;
            console.log('login check');
            Auth.login(app.loginData).then(function (data) {
                 console.log(data);
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/');
                        app.loginData = null;
                        app.successMsg = false;
                    }, 2000);

                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;
                    
                }
            });

        };

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000);
        }

    });


