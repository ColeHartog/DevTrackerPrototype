angular.module('ionicGDM')
.controller('adminStudentCtrl', function($scope, $ionicPopup, student, adminService, $stateParams){
    
    $scope.student = student;
    
    $scope.updateStudentInfo = function(){
        adminService.getStudentInfo($scope.student._id).then(function(response){
            $scope.student = response;
        })
    };
    
    setInterval(function(){
        $scope.updateStudentInfo();
    }, 1000);
    
    $scope.expPer = function(){
        return $scope.User.totalPoints/$scope.totalPointsPossible() *100;
    }
    
    $scope.showPopup = function(data){
        $scope.badge = data;
        if($scope.student.badgesAwarded.indexOf($scope.badge._id) === -1){
            
        var requestPop = $ionicPopup.show({
            template: '<div>{{badge.desc}}</div>',
//            templateUrl: '/views/requestTmpl.html',
            title: 'Award Badge',
            subTitle: $scope.badge.mileStone,
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: 'Award',
                    type: 'button-positive',
                    onTap: function(){
                        adminService.badgeApproval($scope.student._id, $scope.badge._id, $scope.badge.pointValue.points).then(function(response){
                            $scope.updateStudentInfo();
                        });
                    }
                }
            ]
        });
        }
    };
    
    $scope.NBSGP = function(card){
        var tpa = 0;
        var tpp = 0;
        for(var i = 0; i < card.badges.length; i++){
            for(var j = 0; j < $scope.student.badgesAwarded.length; j++){
                if($scope.student.badgesAwarded[j] === card.badges[i]._id){
                    tpa += card.badges[i].pointValue.points;
                }
            }
        }
        for(var j = 0; j < card.badges.length; j++){
            tpp += card.badges[j].pointValue.points;
        }
        var perc = (tpa/tpp)*100;
        if(perc > 100){
            return "../www/img/trophyplatinum.png"
        }
        if(perc >= card.trophyLevels.gold){
            return "../www/img/trophygold.png"
        }
        if(perc >= card.trophyLevels.silver){
            return "../www/img/trophysilver.png"
        }
        if(perc >= card.trophyLevels.bronze){
            return "../www/img/trophybronze.png"
        }
        else{
            return "../www/img/notrophy.png"
        }
        
    };
    
})