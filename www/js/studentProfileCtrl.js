angular.module('ionicGDM')
.controller('studentProfileCtrl', function($scope, $ionicPopup, studentService){
    
    $scope.User = {
        name: 'Maxx Wilson',
        badgesAwarded: [0,3],
        earnedPoints: 10,
        
    };
    
    $scope.totalPointsPossible = function(){
        var total = 0;
        if($scope.User.cohort){
            $scope.User.cohort.cohortCurriculum.deck.forEach(function(card){
                card.badges.forEach(function(badge){
                    total += badge.pointValue.points;
                })
            })
            return total;
        }
    }
    
    $scope.expPer = function(){
        return $scope.User.earnedPoints/$scope.totalPointsPossible() *100;
    }
    
    $scope.addBadge = function(data){
        studentService.badgeRequest(data).then(function(response){
            console.log(response);
            $scope.User.badgesRequested = response.badgesRequested;
        })
    };
    
    $scope.badgeHold = function(data){
        console.log(data);
    }
    
    $scope.showPopup = function(data){
        $scope.badge = data;
        
        var requestPop = $ionicPopup.show({
            template: '<div>{{badge}}</div>',
//            templateUrl: '/views/requestTmpl.html',
            title: 'Request Badge',
            subTitle: $scope.badge.mileStone,
            scope: $scope,
            buttons: [
                {text: 'Cancel'},
                {
                    text: 'Request',
                    type: 'button-positive',
                    onTap: function(){
                        $scope.addBadge($scope.badge._id);
                    }
                }
            ]
        });
    };
    
    $scope.getUserInfo = function(){
        studentService.getStudentInfo().then(function(response){
            $scope.User = response;
        })
    }
    
    $scope.getUserInfo()
    
    $scope.NBSGP = function(card){
        var tpa = 0;
        var tpp = 0;
        for(var i = 0; i < card.badges.length; i++){
            if($scope.User.badgesAwarded.indexOf(card.badges[i]._id) !== -1){
                tpa += card.badges[i].pointValue.points;
            }
        }
        for(var j = 0; j < card.badges.length; j++){
            tpp += card.badges[j].pointValue.points;
        }
        var perc = (tpa/tpp)*100;
        if(perc > 100){
            return "./../../img/trophyplatinum.png"
        }
        if(perc >= card.trophyLevels.gold){
            return "./../../img/trophygold.png"
        }
        if(perc >= card.trophyLevels.silver){
            return "./../../img/trophysilver.png"
        }
        if(perc >= card.trophyLevels.bronze){
            return "./../../img/trophybronze.png"
        }
        else{
            return "./../../img/notrophy.png"
        }
        
    };
})