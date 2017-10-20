angular.module('haxorNews', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'homeCtrl'
            })
            //route for the login page
            .when('/login', {
                templateUrl: 'pages/user/login.html',
                controller: 'loginCtrl'
            })
            .when('/register', {
                templateUrl: 'pages/user/register.html',
                controller: 'registerCtrl'

            })
            //profile routes
            .when('/profile/:userName', {
                templateUrl: 'pages/user/profile.html',
                controller: 'profileCtrl'
            })
            .when('/profile/:userName/edit', {
                templateUrl: 'pages/user/profileEdit.html',
                controller: 'profileEditCtrl'
            })

            // story routes
            .when('/story/:storyId', {
                templateUrl: 'pages/story_single.html',
                controller: 'story_singleCtrl'

            })
            .when('/newpost', {
                templateUrl: 'pages/newPost.html',
                controller: 'newPostCtrl'

            })

            


            // footer routes
            .when('/about', {
                templateUrl: 'pages/footer/about.html',
                controller: 'aboutCtrl'
            })
            .when('/contact', {
                templateUrl: 'pages/footer/contact.html',
                controller: 'contactCtrl'
            })
            .when('/loanbroker7', {
                templateUrl: 'pages/footer/loanbroker7.html',
                controller: 'loanBroker7Ctrl'
            })


            .otherwise({ redirectTo: '/' });
    })
    .constant('API_ENDPOINT', {
        url: 'http://188.226.152.93:8080'
    });