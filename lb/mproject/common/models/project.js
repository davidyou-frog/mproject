var lib_path = process.cwd() + '/server/lib/';
var url = require('url');
var svn = require( lib_path + 'svn.js');
var git = require( lib_path + 'git.js');
var app = require('../../server/server');

module.exports = function(Project) {

    Project.existSvn = function( data, cb) {
    	
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
        'existSvn',
        {
          http: {path: '/existSvn', verb: 'post'},
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

    Project.ignoreSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var local_folder = project.base_path + '/' + svn_folder_name;
			var svn_folder   = project.svn_url + '/' + svn_folder_name;
			
			var svn_config = {
               base_path : local_folder,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
            };
		
			svn.ignoreFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'ignoreSvn',
        {
          http: {path: '/ignoreSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
    Project.commitSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var local_folder = project.base_path + '/' + svn_folder_name;
			var svn_folder   = project.svn_url + '/' + svn_folder_name;
			
			var svn_config = {
               base_path : local_folder,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
            };
		
			svn.commitFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'commitSvn',
        {
          http: {path: '/commitSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
    Project.updateSvn = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) { 

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			var local_folder = project.base_path + '/' + svn_folder_name;
			var svn_folder   = project.svn_url + '/' + svn_folder_name;
			
			var svn_config = {
               base_path : local_folder,
               svn_user  : project.svn_user, 
               svn_pass  : project.svn_pass, 
               svn_url   : svn_folder, 
            };
		
			svn.updateFolder( svn_config,function( err, success ) {
		        var response = { success : success };
		        cb(null, response);
			});

		});

    }
    
    Project.remoteMethod(
        'updateSvn',
        {
          http: {path: '/updateSvn', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );	
	
    Project.existGit = function( data, cb) {
		Project.findOne({where: {code: data.code} }, function(err, project) { 
		
			var Gitlab = app.models.Gitlab;

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			svn_folder_name = svn_folder_name.replace(/\//g,''); 
			
			Gitlab.list(project.gitlab_url,project.gitlab_token, function (err, data) {
				 
			    var isFinding = data.some(function (item, index, array) {
           	        return svn_folder_name ===  item.name;
                });
				
				var response = { exsist : isFinding };
		        cb(null, response);
				 
            });
		    
		});
    	
    }
    
    Project.remoteMethod(
        'existGit',
        {
          http: {path: '/existGit', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
    Project.newGit = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) {

			var Gitlab = app.models.Gitlab;

			var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
			svn_folder_name = svn_folder_name.replace(/\//g,''); 
			
			Gitlab.create(project.gitlab_url,project.gitlab_token, svn_folder_name, function (err, data) {
				
				if( err ){
					cb(null, { success : false } );
				} else {
					
					if( data.message === '404 Not Found' ){
						cb(null, { success : false } );
					} else {
						cb(null, { success : true } );
					}
				}
				 
            });
		
		});

    }
    
    Project.remoteMethod(
        'newGit',
        {
          http: {path: '/newGit', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
    Project.cloneGit = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) {

		    var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
		    var local_folder    = project.base_path + '/' + svn_folder_name + 'git/';
	        var p = url.parse(project.gitlab_url); 
			// http://username:password@hostname/username/name.git   
			var gitlab_url  = p. protocol
			                + '//'
			                + project.gitlab_user
							+ ':'
							+ project.gitlab_pass
							+ '@'
							+ p.hostname
							+ '/'
							+ project.gitlab_user
							+ '/'
							+ svn_folder_name.replace(/\//g,'') 
							+ '.git'; 

		    var git_config = {
                  base_path    : local_folder,
				  gitlab_url   : gitlab_url,
               };
		    
		    git.cloneFolder( git_config,function( err, success ) {
				
				    if( err ) {
						console.log( err );
					} 						
					cb(null, { success : success } );
		    	});

		});

    }
    
    Project.remoteMethod(
        'cloneGit',
        {
          http: {path: '/cloneGit', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );

    Project.configGit = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) {
			
		    var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
		    var local_folder    = project.base_path + '/' + svn_folder_name + 'git/';
			
			git.configLocal( local_folder, 'user.name', project.gitlab_user,function( err, success ) {
                 cb(null, { success : success } );				
			});	
			
		});

    }
    
    Project.remoteMethod(
        'configGit',
        {
          http: {path: '/configGit', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );

    Project.pullGit = function( data, cb) {
    	
		Project.findOne({where: {code: data.code}}, function(err, project) {

		    var svn_folder_name = svn.getSvnPass( project.code, project.folder_name );
		    var local_folder    = project.base_path + '/' + svn_folder_name + 'git/';
	        var p = url.parse(project.gitlab_url); 
			// http://username:password@hostname/username/name.git   
			var gitlab_url  = p. protocol
			                + '//'
			                + project.gitlab_user
							+ ':'
							+ project.gitlab_pass
							+ '@'
							+ p.hostname
							+ '/'
							+ project.gitlab_user
							+ '/'
							+ svn_folder_name.replace(/\//g,'') 
							+ '.git'; 

		    var git_config = {
                  base_path    : local_folder,
				  gitlab_url   : gitlab_url,
               };
		    
		    git.pullFolder( git_config,function( err, success ) {
				
				    if( err ) {
						console.log( err );
					} 						
					cb(null, { success : success } );
		    	});

		});

    }
    
    Project.remoteMethod(
        'pullGit',
        {
          http: {path: '/pullGit', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
};

