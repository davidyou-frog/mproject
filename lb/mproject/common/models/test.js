var lib_path = process.cwd() + '/server/lib/';

var svn = require( lib_path + 'svn.js');

var loopback = require("loopback");

module.exports = function(Test,Config) {
	
	
    Test.test = function( data, cb) {
    	console.log( 'Call Test.test remote method - data = ', data );

   	    response = { ack : 'ok' };
   	    cb(null, response);
		
    };
    
    Test.remoteMethod(
        'test',
        {
          http: {path: '/test', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
};
