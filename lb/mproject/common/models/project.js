var lib_path = process.cwd() + '/server/lib/';
var svn = require( lib_path + 'svn.js');

module.exports = function(Project) {

    Project.exsistSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code} }, function(err, project) { 
		
			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			
			var svn_config = {
               base_path : project.base_path,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : project.svn_url, 
            };
			
			svn.checkExsistFolder( svn_config, svn_folder_name, function( err, exsist ) {
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

    Project.newSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 
		
			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var local_folder = '/template/' + project.template;
			var svn_folder   = project.svn_url + '/' + svn_folder_name;
			
			var svn_config = {
               base_path : project.base_path,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
			   svn_local : local_folder,
            };
			
			svn.importFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'newSvn',
        {
          http: {path: '/newSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
    Project.removeSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 
		
			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var svn_folder   = project.svn_url + '/' + svn_folder_name;

			var svn_config = {
               base_path : project.base_path,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
            };
			
			svn.removeFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'removeSvn',
        {
          http: {path: '/removeSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );

    Project.checkoutSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var local_folder = project.base_path + '/' + svn_folder_name;
			var svn_folder   = project.svn_url + '/' + svn_folder_name;
			
			var svn_config = {
               base_path : project.base_path,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
			   svn_local : local_folder,
            };
		
			svn.checkoutFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'checkoutSvn',
        {
          http: {path: '/checkoutSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
};
