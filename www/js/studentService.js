angular.module('ionicGDM')
.service('studentService', function($http){
    
    this.getStudentInfo = function(){
        return $http({
            method: "GET",
            url: 'http://localhost:4000/api/getUserInfo'
        }).then(function(response){
            return response.data
        })
    };
    
    this.badgeRequest = function(badge){
        return $http ({
            method: "PUT",
            url: 'http://localhost:4000/api/users/badgerequest/' + badge,
        }).then(function(response){
            return response.data;
        })
    }
    
})