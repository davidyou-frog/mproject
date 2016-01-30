var Client = require('svn-spawn');

exports.getSvnPass = function( code, folder_name ) {
	var r_code        = code.replace(/\W/g, '_');
    var r_folder_name = folder_name.replace(/\W/g, '_');
	
	return r_code + '_' + r_folder_name + '/';
}

var getClient = function( config ){
	
    var	client = new Client({
		silent   : true,
        cwd      : config.base_path,
        username : config.svn_user, 
        password : config.svn_pass, 
    });
    
    return client;
	
};
	
exports.checkExsistFolder = function( config, folder_name, cb) {
	var client = getClient( config );
    client.cmd(['list', config.svn_url], function( err, list ) {
		
			if( err ) { cb( err, false ); return; }
            var lines = list.split("\n");
			
            var isFinding = lines.some(function (item, index, array) {
           	    return folder_name ===  item;
            });

            cb( null, isFinding );
        
	});
};

exports.importFolder = function( config, cb) {
	
	var client = getClient( config );
	
    client.cmd(['import', config.base_path, config.svn_url, '-m first', '-q' ], function( err ) {
		if( err ) { cb( err, false ); return; }
        cb( null, true  );
	});
	
};


exports.removeFolder = function( config, cb) {
	
	var client = getClient( config );
	
    client.cmd(['remove', config.svn_url, '-m remove project', '-q' ], function( err ) {
		if( err ) { cb( err, false ); return; }
        cb( null, true  );
	});
	
};

