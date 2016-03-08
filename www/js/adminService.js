angular.module('ionicGDM')
.service('adminService', function($http){
    
    var durl = 'http://192.168.0.95:4000/';
    
    this.getStudentsByCohort = function(){
        return $http({
            method: "GET",
            url: durl + 'api/mobileGSBC/56d4723d7f4d602c0fae9aaa'
        }).then(function(response){
            return response.data
        })
    };
    
    this.getStudentInfo = function(id){
        return $http({
            method: "GET",
            url: durl + "api/mobileStudentById/" + id,
        }).then(function(response){
            return response.data
        })
    };
    
    this.badgeApproval = function(studentID, badgeID, points){
        return $http({
            method: "PUT",
            url: durl + "api/mobileBadgeApproval",
            data: {
                student: studentID,
                badge: badgeID,
                points: points
            }
        }).then(function(response){
            return response.data
        })
    };
    
    this.getUserInfo = function(){
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
    
    this.addToWatchList = function(studentID){
        return $http({
            method: "PUT",
            url: durl + 'api/mobileAddToWatchList',
            data: {
                student: studentID,
            },
            headers: {
                token: localStorage.getItem('app_token'),
            }
        }).then(function(response){
            return response.data
        })
    };
    
    this.removeFromWatchList = function(studentID){
        return $http({
            method: "PUT",
            url: durl + 'api/mobileRemoveFromWatchList',
            data: {
                student: studentID,
            },
            headers: {
                token: localStorage.getItem('app_token'),
            }
        }).then(function(response){
            return response.data
        })
    };
    
})