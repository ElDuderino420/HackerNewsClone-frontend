angular.module('haxorNews')
.controller('story_listCtrl', function($scope) {
    $scope.message = 'Motherfucking search page.';
    $scope.availableFag = {};
    $scope.availableFag.temp = [
        {name:'mathematics', level:''},
        {name:'danish', level:''},
        {name:'physics',level:''},
        {name:'chemistry',level:''},
        {name:'english',level:''},
        {name:'history',level:''},
        {name:'geography',level:''},
        {name:'religion',level:''},
        {name:'social science',level:''},
        {name:'biology',level:''},
        {name:'music',level:''},
        {name:'statistics',level:''}];
    $scope.availableFag.grade = ['4th','5th','6th','7th','8th','9th','10th','11th','12th','13th',];
    $http.get('/api/search').then(function(res){
        $scope.list = res.data;

        $scope.resetSearch = function () {
            $scope.filterstuff = {};
        }
    });
});