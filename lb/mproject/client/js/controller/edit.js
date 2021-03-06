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

    $scope.alerts = [];
	
    $scope.closeAlert = function(index) {
		$scope.alerts = [];
    };  
	
    $scope.setAlert = function( msg ) {
		$scope.alerts = [{ type: 'danger', msg: msg }];
    };  
	
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
	$scope.code    = $stateParams.code;
	
	$scope.project = Project.findOne( { filter: { where: { code: $scope.code } } } );
	                                  
  	$scope.back = function(){
		 $state.go( 'main' );
  	};
	
  	$scope.update = function(project){
		 $scope.project.$save();
		 $state.go( 'main' );
  	 };
	 
  	$scope.CheckExistSvn = function(project){
		
		Project.existSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.exsist == true ) {
			    $scope.setAlert( project.code + ' exist' );
            } else {
				$scope.setAlert( project.code + ' no exist' );
			}

		});		
	};
	
  	$scope.NewSvn = function(project){
		Project.newSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;

            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is imported' );
            } else {
				$scope.setAlert( 'fail : import ' + project.code );
			}			
			
		});		
	};
	
  	$scope.RemoveSvn = function(project){
		Project.removeSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is removed' );
            } else {
				$scope.setAlert( 'fail : remove ' + project.code );
			}			

		});		
	};

  	$scope.CheckoutSvn = function(project){
		Project.checkoutSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is checked out' );
            } else {
				$scope.setAlert( 'fail : check out ' + project.code );
			}			
		});		
	};
	
  	$scope.IgnoreGitSvn = function(project){
		Project.ignoreSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is ignored git folder' );
            } else {
				$scope.setAlert( 'fail : ignore git ' + project.code );
			}			
		});		
	};
	
  	$scope.CommitSvn = function(project){
		Project.commitSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is commited' );
            } else {
				$scope.setAlert( 'fail : commit ' + project.code );
			}			
		});		
	};
	
  	$scope.UpdateSvn = function(project){
		Project.updateSvn( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is updated' );
            } else {
				$scope.setAlert( 'fail : update ' + project.code );
			}			
		});		
	};
	
  	$scope.CheckExistGit = function(project){
		
		Project.existGit( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;
            if( data.exsist == true ) {
			    $scope.setAlert( project.code + ' exist' );
            } else {
				$scope.setAlert( project.code + ' no exist' );
			}

		});		
	};

  	$scope.NewGit = function(project){
		Project.newGit( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;

            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is created' );
            } else {
				$scope.setAlert( 'fail : create ' + project.code );
			}			
			
		});		
	};
	
  	$scope.CloneGit = function(project){
		Project.cloneGit( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;

            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is cloned' );
            } else {
				$scope.setAlert( 'fail : clone ' + project.code );
			}			
			
		});		
	};

  	$scope.ConfigGit = function(project){
		Project.configGit( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;

            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is configed' );
            } else {
				$scope.setAlert( 'fail : config ' + project.code );
			}			
			
		});		
	};
	
  	$scope.PullGit = function(project){
		Project.pullGit( { code : project.code } ).$promise.then(function ( value,responseHeaders) {
			var data = value.data;

            if( data.success == true ) {
			    $scope.setAlert( project.code + ' is pulled' );
            } else {
				$scope.setAlert( 'fail : pull ' + project.code );
			}			
			
		});		
	};
	
}]);  
