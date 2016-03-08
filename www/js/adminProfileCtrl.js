angular.module('ionicGDM')
.controller('adminProfileCtrl', function($scope, $state, adminService){
    
    $scope.getUserInfo = function(){
        adminService.getUserInfo().then(function(response){
            $scope.User = response;
        })
    };
    
    $scope.getUserInfo();
    
    $scope.setToWatch = function(data){
        if($scope.watching(data._id)){
            adminService.removeFromWatchList(data._id).then(function(response){
                $scope.getUserInfo();
            });
        }
        else{
            adminService.addToWatchList(data._id).then(function(response){
                $scope.getUserInfo();
            });
        }
    };
    
    $scope.SURB = null;
    
    $scope.SURBF = function(name){
        if($scope.SURB !== name){
            $scope.SURB = name; 
        }
        else{
            $scope.SURB = null;
        }
    }
    
    $scope.goToStudent = function(name){
        $state.go('Admin.student', {name: name})
    };
    
    $scope.getStudents = function(){
        adminService.getStudentsByCohort().then(function(response){
            $scope.students = response;
        })
    };
    
    setInterval(function(){
        $scope.getStudents();
    }, 1000);
    
    $scope.watching = function(ID){
        if($scope.User){
            for(var i = 0; $scope.User.watchList.length; i++){
                if($scope.User.watchList[i] === ID){
                    return true
                }
            }
        }
        return false
    }
    
    $scope.getStudents();
    
})