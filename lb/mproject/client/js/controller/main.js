'use strict';

/**
 * @ngdoc function
 * @name mainApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the mainApp
 */
var mainApp = angular.module('mainApp'); 
mainApp.controller('mainCtrl', 
[ '$rootScope', '$scope', 'Project', '$state', '$timeout', '$uibModal',
function ($rootScope, $scope,Project,$state,$timeout,$uibModal ) {
	
	var codeCellTemplate = '<div class="ui-grid-cell-contents text-center">{{row.entity[col.field]}}</div>';
	                            
    $scope.gridOptions = {
	  enableFullRowSelection: true,
	  enableRowSelection: true,	
	  multiSelect: false,
	  enableRowHeaderSelection: false,
      columnDefs: [
        {field: 'code', displayName: 'Code', width : 100, cellTemplate: codeCellTemplate },
        {field: 'name', displayName: 'Name'},
        {field: 'folder_name', displayName: 'Folder_Name'},
      ]    
    };
	
    $scope.gridOptions.onRegisterApi = function( gridApi ) {
        $scope.gridApi = gridApi;
		
	    if( $rootScope.gridState ){
            $timeout(function() {
				$scope.gridApi.saveState.restore( $scope, $rootScope.gridState );
			});	
	    }	
    };

	$scope.gridOptions.data = Project.find();
	
	$scope.edit = function(){
		var s = $scope.gridApi.selection;
		if( s.getSelectedCount() > 0 ) {
		    var item = s.getSelectedRows()[0];
			$rootScope.gridState = $scope.gridApi.saveState.save();
			$state.go("edit", { code : item.code } );
		}
	};
	
	$scope.remove = function(){
		var s = $scope.gridApi.selection;
		if( s.getSelectedCount() > 0 ) {
			
		    var item = s.getSelectedRows()[0];
			
            var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'removeModalContent.html',
                    controller : 'removeModalCtrl',
                    resolve: {
                        item : function () {
                                 return item;
                        },
                    }
                });
				
            modalInstance.result.then(function () {
                // OK  				    
                    Project.deleteById( { id: item.code } ,  
				    function(list) { 
					    var index = $scope.gridOptions.data.indexOf(item);
                        $scope.gridOptions.data.splice(index, 1);
					},
                    function(errorResponse) { 
					    // delete fail! 
                    });					
                }, function () {
				// Cancel
				
            });
			
		}
	};
	
}]);  

mainApp.controller('removeModalCtrl', function ($scope, $uibModalInstance, item ) {

    $scope.item = item;
	
    $scope.ok = function () {
      $uibModalInstance.close();
    };
  
    $scope.cancel = function () {
      $uibModalInstance.dismiss();
    };
	
});

