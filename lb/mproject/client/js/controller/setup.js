'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:setupCtrl
 * @description
 * # setupCtrl
 * Controller of the mainApp
 */
var mainApp = angular.module('mainApp'); 
mainApp.controller('setupCtrl', [ '$scope','Config', function ($scope,Config) {

    $scope.alerts = [];
	
    $scope.closeAlert = function(index) {
		$scope.alerts = [];
    };  
	
    $scope.setAlert = function( msg ) {
		$scope.alerts = [{ type: 'danger', msg: msg }];
    };  

    $scope.configFields = [{
        key: 'base_path',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Base root path',
        }
    },{
        key: 'template',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Template path',
        }
    },{
        key: 'svn_url',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Subversion URL',
        }
    },{
        key: 'svn_user',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Subversion Username',
        }
    },{
        key: 'svn_pass',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Subversion Password',
        }
    },{
        key: 'gitlab_url',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'GitLab URL',
        }
    },{
        key: 'gitlab_user',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'GitLab Username',
        }
    },{
        key: 'gitlab_pass',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'GitLab Password',
        }
    },{
        key: 'gitlab_token',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'GitLab Token',
        }
    }];
	
	 $scope.config = Config.findById({ id: 1 });
	
  	 $scope.update = function(config){
		 $scope.config = config;
		 $scope.config.$save(function() {
            // success
			 $scope.setAlert( "update success" );
         }, function(res) {
            // error
			$scope.setAlert( "update fail" );
         });
  	 };
	 
}]);  
 
