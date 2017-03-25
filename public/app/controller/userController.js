//console.log('Testing user controller');

angular.module('userControllers', [])

    /**  .config(function () { 
          console.log('inside userController')}
  
      );
      */
    .controller('registerController', function ($http, $location, $timeout, User) {
        //   console.log('inside register controller');

        var app = this;
        this.regUser = function (regData) {
            app.loading = true;
            app.errMsg = false;
            console.log('register form submitted');
            console.log(this.regData);
            User.create(this.regData).then(function (data) {
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