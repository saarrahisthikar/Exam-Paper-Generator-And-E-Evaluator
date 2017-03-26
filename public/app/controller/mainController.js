//console.log('This is the main Controller');

angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function ($http, $location, $timeout, Auth) {
        // console.log('This is the main controller');
        var app = this;
        app.loading = true;
        app.errMsg = false;
        this.doLogin = function (loginData) {
            //console.log('login check');
            Auth.login(this.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/');
                    }, 2000);

                } else {
                    app.loading = false;
                    app.errMsg = data.data.message;
                }
            });

        };

    });


