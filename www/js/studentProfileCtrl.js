angular.module('ionicGDM')
.controller('studentProfileCtrl', function($scope, $ionicPopup, studentService){
    
    $scope.totalPointsPossible = function(){
        var total = 0;
        if($scope.User.cohort){
            $scope.User.cohort.curriculum.deck.forEach(function(card){
                card.badges.forEach(function(badge){
                    total += badge.pointValue.points;
                })
            })
            return total;
        }
    }
    
    $scope.expPer = function(){
        if($scope.User){
            return $scope.User.earnedPoints/$scope.totalPointsPossible() *100;
        }
    }
    
    $scope.addBadge = function(data){
        studentService.badgeRequest(data).then(function(response){
            $scope.getUserInfo();
        })
    };
    
    $scope.removeBadge = function(data){
        studentService.badgeWithdraw(data).then(function(response){
            $scope.getUserInfo();
        })
    };
    
    $scope.showPopup = function(data){
        $scope.badge = data;
        if($scope.User.badgesRequested.indexOf($scope.badge._id) === -1){
        
            var requestPop = $ionicPopup.show({
                template: '<div>{{badge.desc}}</div>',
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
        }
        else{
            var requestPop = $ionicPopup.show({
                template: '<div>{{badge.desc}}</div>',
    //            templateUrl: '/views/requestTmpl.html',
                title: 'Withdraw Badge Request',
                subTitle: $scope.badge.mileStone,
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: 'Withdraw',
                        type: 'button-positive',
                        onTap: function(){
                            $scope.removeBadge($scope.badge._id);
                    }
                    }
                    ]
            });
        }
    };
    
    $scope.getUserInfo = function(){
        studentService.getStudentInfo().then(function(response){
            $scope.User = response;
        })
    }
    
    $scope.getUserInfo();
    
    setInterval(function(){
        $scope.getUserInfo();
    }, 1000);
    
    $scope.NBSGP = function(card){
        var tpa = 0;
        var tpp = 0;
        for(var i = 0; i < card.badges.length; i++){
            for(var j = 0; j < $scope.User.badgesAwarded.length; j++){
                if($scope.User.badgesAwarded[j]._id === card.badges[i]._id){
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
    
    $scope.indexOfBadge = function(ID){
        for(var i = 0; i < $scope.User.badgesAwarded.length; i++){
            if($scope.User.badgesAwarded[i]._id === ID){
                return i
            }
        }
        return -1
    };
    
    $scope.trophyCount = function(){
        if($scope.User){
            var trophies = {bronze: 0, silver: 0, gold: 0};
            for(var i = 0; i < $scope.User.cohort.curriculum.deck.length; i++){
                var tpa = 0;
                var tpp = 0;
                for(var j = 0; j < $scope.User.cohort.curriculum.deck[i].badges.length; j++){
                    for(var k = 0; k < $scope.User.badgesAwarded.length; k++){
                        if($scope.User.badgesAwarded[k]._id === $scope.User.cohort.curriculum.deck[i].badges[j]._id){
                            tpa += $scope.User.cohort.curriculum.deck[i].badges[j].pointValue.points;
                        }
                    }
                }


                for(var l = 0; l < $scope.User.cohort.curriculum.deck[i].badges.length; l++){
                    tpp += $scope.User.cohort.curriculum.deck[i].badges[l].pointValue.points;
                }
                var perc = (tpa/tpp)*100;
                if(perc >= $scope.User.cohort.curriculum.deck[i].trophyLevels.gold){
                    trophies.gold += 1;
                }
                if(perc >= $scope.User.cohort.curriculum.deck[i].trophyLevels.silver){
                    trophies.silver += 1;
                }
                if(perc >= $scope.User.cohort.curriculum.deck[i].trophyLevels.bronze){
                    trophies.bronze += 1;
                }

            }
            return trophies
        }
    };
    
})