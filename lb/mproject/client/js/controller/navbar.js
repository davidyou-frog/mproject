(function(){
'use strict';

var mainApp = angular.module('mainApp'); 
mainApp.controller('navbarCtrl', [ '$scope', 'authServices',  function ($scope, authServices ) {

 	$scope.logout = function  () {
 		authServices.logout();
 	};
	
}]);
	
})();
