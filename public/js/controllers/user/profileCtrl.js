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

    $(document).ready(function() {
        $(".btn-pref .btn").click(function () {
            $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
            // $(".tab").addClass("active"); // instead of this do the below 
            $(this).removeClass("btn-default").addClass("btn-primary");   
        });
        });

});