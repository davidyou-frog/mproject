'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:newCtrl
 * @description
 * # newCtrl
 * Controller of the mainApp
 */
var mainApp = angular.module('mainApp'); 
mainApp.controller('newCtrl', 
[ '$scope','Config', 'Project','$state', 
function ($scope,Config, Project,$state) {

    $scope.baseFields = [{
        key: 'code',
        type: 'input',
        templateOptions: {
            required: true,
            label: 'Code',
			placeholder : "XXXX-XXXX",
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

    $scope.gitFields = [{
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
	
	$scope.project = {};
	var reset_config = {};
	var reset = function () {
		
                $scope.project.code         = "";
                $scope.project.name         = "";
                $scope.project.folder_name  = "";
                $scope.project.base_path    = reset_config.base_path   ;
                $scope.project.template     = reset_config.template    ;
                $scope.project.svn_url      = reset_config.svn_url     ;
                $scope.project.svn_user     = reset_config.svn_user    ;
                $scope.project.svn_pass     = reset_config.svn_pass    ;
                $scope.project.gitlab_url   = reset_config.gitlab_url  ;
                $scope.project.gitlab_user  = reset_config.gitlab_user ;
                $scope.project.gitlab_pass  = reset_config.gitlab_pass ;
                $scope.project.gitlab_token = reset_config.gitlab_token;
		
	}
	
	Config.findById( { id: 1 }, 
	       function(config) { /* success */ 
		        reset_config = config;
				reset();
	       },
           function(errorResponse) { /* error */ 
		   }
	 );

  	 $scope.reset = function(){
		 reset();
  	 };
	
  	 $scope.create = function(project){
		 console.log( "Call $scope.create()" );
		 console.log( project );
		 Project.create( project ,
		     function(projectResult) { /* success */ 
			     console.log( "CB Project.create() success"  );
				 console.log( projectResult );
		         $state.go( 'main' );     
	         },
             function(errorResponse) { /* error */ 
			     console.log( "CB Project.create() error"  );
				 console.log( errorResponse );
		     }
		);
  	 };
	 
}]);  
 
