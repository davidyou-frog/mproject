var git = require("nodegit");

exports.initFolder = function( config, cb) {

    console.log( "CALL initFolder()" );	
    console.log( "config = ", config );	
	
	var is_bare = 0;
	
    git.Repository.init( config.base_path, is_bare ).then( function (repo) {
	    console.log( 'CB success git.Repository.init() = ', repo );
	    cb( null, true  );
    }).catch(function (reasonForFailure) {
	    console.log( 'CB error git.Repository.init() = ', reasonForFailure );
	    cb( reasonForFailure, null  );
    });
	
};

exports.testFolder = function( config, cb) {

    console.log( "CALL testFolder()" );	
	console.log( "config = ", config );	
	
    git.Repository.open( config.base_path ).then(function(repo) {
		console.log( 'CB success git.Repository.open() = ', repo );
		console.log( repo );
		
		return git.Remote.create(repo, "origin", "git@github.com:nodegit/push-example.git");
		
	    
//        repo = repoResult;
//        return repoResult.openIndex();
    }).then(function( remote ) {
		
		cb( null, true  );
		
	}).catch(function (reasonForFailure) {
	    console.log( 'CB error git.Repository.open() = ', reasonForFailure );
	    cb( reasonForFailure, null  );
    });

          // 192.168.10.12:
          // git 
	
};

