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
            .when('/profile/:displayName', {
                templateUrl: 'pages/user/profile.html',
                controller: 'profileCtrl'
            })
            .when('/profile/:displayName/edit', {
                templateUrl: 'pages/user/profileEdit.html',
                controller: 'profileEditCtrl'
            })

            // story routes
            .when('/stories!', {
                templateUrl: 'pages/story_list.html',
                controller: 'story_listCtrl'

            })
            .when('/story/:storyId', {
                templateUrl: 'pages/story_single.html',
                controller: 'story_singleCtrl'

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