angular.module('ionicGDM')
.controller('adminProfileCtrl', function($scope, $state, adminService){
    
    $scope.students = [
        {
            image: 'http://www.mcs.anl.gov/research/LANS/images/people/missing.png',
            name: {
                first: 'Ichi',
                last: 'Alpha'
            },
            badgesrequested: [1,2,3],
            watch: true,
        },
        {
            image: 'http://www.mcs.anl.gov/research/LANS/images/people/missing.png',
            name: {
                first: 'Ni',
                last: 'Beta'
            },
            badgesrequested: [1],
            watch: true,
        },
        {
            image: 'http://www.mcs.anl.gov/research/LANS/images/people/missing.png',
            name: {
                first: 'San',
                last: 'Delta'
            },
            badgesrequested: [],
            watch: false,
        },
        {
            image: 'http://www.mcs.anl.gov/research/LANS/images/people/missing.png',
            name: {
                first: 'Shi',
                last: 'Omega'
            },
            badgesrequested: [1,3],
            watch: true,
        },
        {
            image: 'http://www.mcs.anl.gov/research/LANS/images/people/missing.png',
            name: {
                first: 'Go',
                last: 'Pi'
            },
            badgesrequested: [1],
            watch: false,
        },
    ];
    
    $scope.setToWatch = function(data){
        $scope.students[$scope.students.indexOf(data)].watch = !$scope.students[$scope.students.indexOf(data)].watch;
    }
    
    $scope.SURB = null;
    
    $scope.SURBF = function(name){
        if($scope.SURB !== name){
            $scope.SURB = name; 
        }
        else{
            $scope.SURB = null;
        }
    }
    
    $scope.badges = [
                {
                    _id: 0,
                    badgeImage: 'https://pbs.twimg.com/profile_images/520644667499507712/BbVTflSP_400x400.png',
                    mileStone: 'Structure',
                    pointValue: {easy: 5}
                },
                {
                    _id: 1,
                    badgeImage: 'https://pbs.twimg.com/profile_images/520644667499507712/BbVTflSP_400x400.png',
                    mileStone: 'Tags',
                    pointValue: {easy: 5}
                },
                {
                    _id: 2,
                    badgeImage: 'https://pbs.twimg.com/profile_images/520644667499507712/BbVTflSP_400x400.png',
                    mileStone: 'Links',
                    pointValue: {medium: 10}
                },
                {
                    _id: 3,
                    badgeImage: 'http://rigor.com/wp-content/uploads/2015/12/CSS.png',
                    mileStone: 'Properties',
                    pointValue: {easy: 5}
                },
                {
                    _id: 4,
                    badgeImage: 'http://rigor.com/wp-content/uploads/2015/12/CSS.png',
                    mileStone: 'Classes',
                    pointValue: {easy: 5}
                },
                {
                    _id: 5,
                    badgeImage: 'http://rigor.com/wp-content/uploads/2015/12/CSS.png',
                    mileStone: 'Selectors',
                    pointValue: {medium: 10}
                },
                {
                    _id: 6,
                    badgeImage: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg',
                    mileStone: 'Variables',
                    pointValue: {easy: 5}
                },
                {
                    _id: 7,
                    badgeImage: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg',
                    mileStone: 'Arrays',
                    pointValue: {easy: 5}
                },
                {
                    _id: 8,
                    badgeImage: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg',
                    mileStone: 'Objects',
                    pointValue: {medium: 10}
                },
    ];
    
    $scope.goToStudent = function(name){
        $state.go('Admin.student', {name: name})
    };
    
    $scope.getStudents = function(){
        adminService.getStudentsByCohort().then(function(response){
            $scope.students = response;
        })
    };
    
    $scope.getStudents();
    
})