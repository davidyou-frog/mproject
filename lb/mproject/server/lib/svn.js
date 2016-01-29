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

// exports.importFolder = function( config, local_folder_name, svn_folder_name, cb) {
// 	
// 	var client = getClient( config );
// 	
//     client.cmd(['import', local_folder_name, config.svn_url + '/' + svn_folder_name], function( err, data ) {
// 		
// 			if( err ) { cb( err, false ); return; }
// 			
// 			console.log( 'data = ', data );
// //            var lines = list.split("\n");
// //			
// //            var isFinding = lines.some(function (item, index, array) {
// //           	    return folder_name ===  item;
// //            });
// 
//             cb( null, null );
//         
// 	});
// 	
// };


// # svn import sampledir http://(Subversion 서버의 IP주소 또는 도메인)/svn/sample/trunk


