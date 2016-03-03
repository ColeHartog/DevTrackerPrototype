angular.module('ionicGDM')
.service('adminService', function($http){
    
    this.getStudentsByCohort = function(){
        return $http({
            method: "GET",
            url: 'http://localhost:4000/api/getStudentsByCohort/56d4723d7f4d602c0fae9aaa'
        }).then(function(response){
            return response.data
        })
    };
    
    this.getStudentInfo = function(id){
        return $http({
            method: "GET",
            url: "http://localhost:4000/api/users/getStudentInfo/" + id,
        }).then(function(response){
            return response.data
        })
    };
    
    this.badgeApproval = function(studentID, badgeID, points){
        return $http({
            method: "PUT",
            url: "http://localhost:4000/api/badgeApproval",
            data: {
                student: studentID,
                badge: badgeID,
                points: points
            }
        }).then(function(response){
            return response.data
        })
    };
    
})