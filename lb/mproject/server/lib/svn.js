var Client = require('svn-spawn');
var app = require('../../server/server');

var createClient = function( cb ){
	
	var Config = app.models.Config;
	
 	Config.findById( 1, function(err, config) {
		
		if( err ) { cb( err, {} ); return; } 
		
		var	client = new Client({
            cwd: config.base_path,
            username: config.svn_user, 
            password: config.svn_pass, 
        });
		
		client.svn_url = config.svn_url;

		cb( null, client );
		
 	});
	
};
	
exports.isBeen = function(cb) {
	
	createClient( function ( err, client ) {
		
		if( err ) { cb( err, false ); return; }
		
        client.cmd(['list', client.svn_url], function( err, list ) {
			
			if( err ) { cb( err, false ); return; }
			
            var lines = list.split("\n");
            console.log(lines);
            cb( null, true );
        
        });
		
	});
};

