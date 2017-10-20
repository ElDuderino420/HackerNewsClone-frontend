angular.module('haxorNews')
.controller('profileCtrl', function($scope, AuthService) {

    $scope.profileUser = window.location.href.split('#')[1].slice(9)
    if(Math.floor(Math.random()*2) == 0){
        $scope.profileImg =  "./images/default.png"
    }else{
        $scope.profileImg =  "./images/default2.jpg"
    }

    AuthService.profileKarma($scope.profileUser,function(res){
        $scope.profileKarma = res.karmaPoints;
    })

   
    var active = "tab1";    
    $scope.setPrimary = function(id) {
        console.log(id)
        $("#"+active+"but").removeClass("btn-primary").addClass("btn-default");
        document.getElementById(active).style.display = "none";
        active = id
        document.getElementById(active).style.display = "inline";
        $("#"+active+"but").removeClass("btn-default").addClass("btn-primary");
    }
    AuthService.getUserStories($scope.profileUser, function(res){
        if(res.status != null && res.status == 200){
            $scope.profileStoryList = res.data
        }else{
            $scope.profileStoryList = []
        }
        console.log(res.data)
    })

    

});