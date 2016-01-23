(function(){
'use strict';
var mainApp = angular.module('mainApp',
    ['ui.router','lbServices','formly', 'formlyBootstrap','ui.bootstrap' ]);

mainApp.config([ '$stateProvider','$urlRouterProvider', '$httpProvider',
function($stateProvider,$urlRouterProvider,$httpProvider) {

  $stateProvider
    .state('before_login', {
		url        : '/before_login',
		templateUrl: 'view/before_login.html',
		skipLogin : true
    })
    .state('signup', {
		url: '/signup',
		templateUrl: 'view/signup.html',
		controller : 'signupCtrl',
		skipLogin : true
    })
    .state('login', {
		url: '/login',
		templateUrl: 'view/login.html',
		controller : 'loginCtrl',
		skipLogin : true
    })
    .state('new', {
		url: '/new',
		templateUrl: 'view/new.html',
		controller : 'newCtrl',
		skipLogin : false
    })
    .state('setup', {
		url: '/setup',
		templateUrl: 'view/setup.html',
		controller : 'setupCtrl',
		skipLogin : false
    })
    .state('main', {
		url: '/main',  
	    views:{
			''                  : { templateUrl: 'view/main.html'         , controller: 'mainCtrl'         },
	    },
		skipLogin : false
    })
    ;

	$urlRouterProvider.otherwise('before_login');
	
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth,$rootScope) {
        return {
            responseError: function(rejection) {
                 if (rejection.status === 401) {
                     LoopBackAuth.clearUser();
                     LoopBackAuth.clearStorage();
					 $rootScope.$state.go( 'before_login' );
                 }
                 return $q.reject(rejection);
            }
        };
    });
	
	
}]);


mainApp.run( ['$rootScope', '$state', 'GeneralUser', function($rootScope, $state, GeneralUser ){

	if( GeneralUser.isAuthenticated() ){
		GeneralUser.getCurrent( function( user ){
//			console.log( 'Callback GeneralUser.getCurrent()' );
			$rootScope.currentUser = GeneralUser.getCachedCurrent();
//			console.log( '  $rootScope.currentUser ', $rootScope.currentUser );
			$state.go(localStorage['LastState']);
			
		});
	}
	
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        console.log( 'Event $stateChangeStart' );
//		console.log( '  toState = ', toState );
//		console.log( '  $rootScope.currentUser ', $rootScope.currentUser );
		 
		if( !$rootScope.currentUser && !toState.skipLogin ){
			$state.go('before_login'); 
            event.preventDefault();
		}
    });
	
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		localStorage['LastState'] = toState.name;
	});	
	
}]);

})();
