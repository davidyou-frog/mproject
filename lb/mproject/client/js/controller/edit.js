'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:editCtrl
 * @description
 * # editCtrl
 * Controller of the mainApp
 */
var mainApp = angular.module('mainApp'); 
mainApp.controller('editCtrl', 
[ '$scope','Config', 'Project','$state', '$stateParams',
function ($scope,Config, Project,$state, $stateParams) {

    $scope.baseFields = [{
        key: 'code',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Code',
			placeholder : "XXXX-XXXX",
			disabled : true,
        }
    },{
        key: 'name',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Name',
			placeholder : "Project name",
        }
    },{
        key: 'folder_name',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Folder Name',
			placeholder : "Project folder name",
        }
    },{
        key: 'base_path',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Base root path',
			disabled : true,
       }
    },{
        key: 'template',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Template path',
       }
    }];
 
    $scope.svnFields = [{
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
    }];
	
	$scope.project = {};
	$scope.code    = $stateParams.code;
	
	$scope.project = Project.findOne( { filter: { where: { code: $scope.code } } } );
	                                  
  	$scope.back = function(){
		 $state.go( 'main' );
  	};
	
  	$scope.update = function(project){
		 $scope.project.$save();
		 $state.go( 'main' );
  	 };
	 
  	$scope.CheckExsistSvn = function(project){
		
		Project.exsistSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
			
            if (typeof data== 'object') {
				  data = JSON.stringify(data, undefined, 2);
            }

		});		
	};
	
  	$scope.NewSvn = function(project){
		Project.newSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
			
            if (typeof data== 'object') {
				  data = JSON.stringify(data, undefined, 2);
            }

		});		
	};
	
	 
}]);  
 
