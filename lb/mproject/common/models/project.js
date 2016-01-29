var lib_path = process.cwd() + '/server/lib/';
var svn = require( lib_path + 'svn.js');

module.exports = function(Project) {

    Project.exsistSvn = function( data, cb) {
    	console.log( 'Call Project.exsistSvn remote method - data = ', data );
    	
		Project.findOne({where: {code: data.code} }, function(err, project) { 
		
		    console.log( err );
			console.log( project );
			
			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			console.log( 'svn_folder_name = ', svn_folder_name );
			
			var svn_config = {
               base_path : project.base_path,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : project.svn_url, 
            };
			
			svn.checkExsistFolder( svn_config, svn_folder_name, function( err, exsist ) {
				console.log( 'exsist = ', exsist );
		        var response = { exsist : exsist };
		        cb(null, response);
			});
			
		});
    	
    }
    
    Project.remoteMethod(
        'exsistSvn',
        {
          http: {path: '/exsistSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );

//    Project.newSvn = function( data, cb) {
//    	console.log( 'Call Project.newSvn remote method - data = ', data );
//    	
//		Project.findOne({where: {code: data.code}}, function(err, project) { 
//		
//		    console.log( err );
//			console.log( project );
//			
//			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
//			console.log( 'svn_folder_name = ', svn_folder_name );
//			
//			var svn_config = {
//               base_path : project.base_path,
//               svn_user  : project.svn_user, 
//               svn_pass  : project.svn_pass, 
//               svn_url   : project.svn_url, 
//            };
//			
//			svn.importFolder( svn_config, svn_folder_name, function( err, exsist ) {
//				console.log( 'exsist = ', exsist );
//		        var response = { exsist : exsist };
//		        cb(null, response);
//			});
//			
//		});
//    	
//    }
//    
//    Project.remoteMethod(
//        'newSvn',
//        {
//          http: {path: '/newSvn', verb: 'post'},
//          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
//          returns: {arg: 'data', type: 'object' }
//        }
//    );
	
};
