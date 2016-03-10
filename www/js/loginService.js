angular.module('ionicGDM')
.service('loginService', function($http){
    
    var durl = 'http://162.243.31.87:80/'
    
    this.login = function(data){
        return $http({
            method: "POST",
            url: durl + "api/mobileLogin",
            data : data,
        }).then(function(response){
            return response.data
        })
    };
    
    
    
})