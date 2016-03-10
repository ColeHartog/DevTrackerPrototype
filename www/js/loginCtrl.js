angular.module('ionicGDM')
.controller('loginCtrl', function($scope, loginService, $state){
    
    $scope.test ='Login Scope';
    
    $scope.login = function(data){
        loginService.login(data).then(function(response){
            if(response.Login === true){
                localStorage.setItem('app_token', response.token);
                if(response.status === 'Student'){
                    $state.go('Student');
                }
                else if(response.status === 'Mentor' || response.status === 'Admin'){
                    $state.go('Admin.students')
                }
            }
        })
    }
    
})