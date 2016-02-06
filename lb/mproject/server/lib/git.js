var git = require('gitty');

exports.cloneFolder = function( config, cb) {
	git.clone( config.base_path, config.gitlab_url, function(output){
		if( output ){
			cb( output, false  );	
		} else {
		     cb( null, true  );		
		}
	    
	});
    
}
