angular.module('ionicGDM')
.service('studentService', function($http){
    
    var durl = 'http://162.243.31.87:80/'
    
    this.getStudentInfo = function(){
        return $http({
            method: "GET",
            url: durl + 'api/mobileGSI',
            headers: {
                token: localStorage.getItem('app_token'),
            }
        }).then(function(response){
            return response.data
        })
    };
    
    this.badgeRequest = function(badge){
        return $http ({
            method: "PUT",
            url: durl + 'api/mobileBadgeRequest/' + badge,
            headers: {
                token: localStorage.getItem('app_token'),
            }
        }).then(function(response){
            return response.data;
        })
    };
    
    this.badgeWithdraw = function(badge){
        return $http ({
            method: "PUT",
            url: durl + 'api/mobileBadgeWithdraw/' + badge,
            headers: {
                token: localStorage.getItem('app_token'),
            }
        }).then(function(response){
            return response.data;
        })
    }
    
})