angular.module('userController',[])

.controller('registrationCtrl',function($http){
    this.regUser = function (regData) {
        $http.post('/register', this.regData);
    }
});
