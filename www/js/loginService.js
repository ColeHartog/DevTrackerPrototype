angular.module('ionicGDM')
.service('loginService', function($http){
    
    var durl = 'http://192.168.0.95:4000/'
    
    this.login = function(data){
        console.log('logging in');
        return $http({
            method: "POST",
            url: durl + "api/mobileLogin",
            data : data,
        }).then(function(response){
            return response.data
        })
    };
    
    
    
})