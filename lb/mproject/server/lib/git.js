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

exports.pullFolder = function( config, cb) {
	var repo = git(config.base_path);
	repo.pull( 'origin', 'master', function(output){
		if( output ){
			cb( output, false  );	
		} else {
		     cb( null, true  );		
		}
	    
	});
    
}

exports.configLocal = function( local_folder, key, val, cb) {
	
   var repo = git(local_folder);	
   var cmd = new git.Command(repo, 'config', [key], '"' + val + '"');
   
   cmd.exec(function(err, stdout, stderr) {
	   if( err ) {
		   cb( err, false  );		
	   } else {
		   cb( null, true  );		
	   }
   })
   
}
