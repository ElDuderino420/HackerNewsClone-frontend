angular.module('haxorNews')
.controller('profileCtrl', function($scope, AuthService, $location) {
    $scope.tempScore = {};
    $scope.profileUser = window.location.href.split('#')[1].slice(9)
    if(Math.floor(Math.random()*2) == 0){
        $scope.profileImg =  "./images/default.png"
    }else{
        $scope.profileImg =  "./images/default2.jpg"
    }

    AuthService.profileKarma($scope.profileUser,function(res){
        console.log(res)
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
            $scope.stories = res.data
        }
        else if(res.status == 888 || res.status == 777){
            $location.path("/")
        }
        else{
            $scope.stories = []
        }
        console.log(res.data)
    })

    var cur_date = new Date();
    $scope.timeStamp = function(time){
        var diff = cur_date - new Date(time);

        if (diff < 60000) {
        return " just now!" 
        }
        else if(diff >= 60000 && diff < 3600000){
            return Math.floor(diff / 60000) + ' minutes ago' ;
        }
        else if(diff >= 3600000 && diff < 86400000){
            return Math.floor(diff / 3600000) + ' hours ago' ;
        }
        else{
            if(diff <=  172800000){
                return Math.floor(diff / 86400000) + ' day ago' ;
            }
            return Math.floor(diff / 86400000) + ' days ago' ;
        }
        //return cur_date - created;
    }


    $scope.close = function (storyId) {
        $('#close' + storyId).hide();
        $('#more' + storyId).show();
        $('#postText' + storyId).hide();
        console.log("asd2")
    }

    $scope.more = function (storyId) {
        $('#close' + storyId).show();
        $('#more' + storyId).hide();
        $('#postText' + storyId).show();
        console.log("asd")
    }
    $scope.getPostScore = function (upvote, downvote) {
        var total = upvote - downvote;
        if (total % 1000 < 0) {
            return Math.floor(total / 1000).toString() + "k";
        } else {
            return (total).toString();
        }
    }
    $scope.flag = function(storyId){
        AuthService.flag(storyId, function (res) {
            if (res.status == 200) {
                console.log("id: " + storyId + " was flagged!")
                
            }
            else {
                console.log("id: " + storyId + " was NOT flagged! something went wrong m8")
            }
        })
    }
    $scope.upvote = function (storyId) {
        AuthService.upVote(storyId, function (res) {
            if (res.status == 200) {
                console.log("id: " + storyId + " was upvoted!")
                document.getElementById("upvoteImg" + storyId).src = "./images/upvote.png";
                if($scope.tempScore[storyId.toString()] != null){
                    $scope.tempScore[storyId.toString()] += 1
                }else{
                    $scope.tempScore[storyId.toString()] = 1
                }
                console.log($scope.tempScore)
            }
            else {
                console.log("id: " + storyId + " was NOT upvoted! something went wrong m8")
            }
        })

    }
    $scope.downvote = function (storyId) {
        AuthService.downVote(storyId, function (res) {
            if (res.status == 200) {
                console.log("id: " + storyId + " was downvoted!")
                document.getElementById("downvoteImg" + storyId).src = "./images/downvote.png";
                if($scope.tempScore[storyId.toString()] != null){
                    $scope.tempScore[storyId.toString()] += -1
                }else{
                    $scope.tempScore[storyId.toString()] = -1
                }
                console.log($scope.tempScore)
            }
            else {
                console.log("id: " + storyId + " was NOT downvoted! something went wrong m8")
            }
        })
    }

    

});