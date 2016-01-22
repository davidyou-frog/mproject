module.exports = function(Test) {

    Test.test = function( data, cb) {
    	console.log( 'Call Test.test remote method - data = ', data );
    	response = { ack : 'ok' };
    	cb(null, response);
    }
    
    Test.remoteMethod(
        'test',
        {
          http: {path: '/test', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: { source: 'body' } },
          returns: {arg: 'data', type: 'object' }
        }
    );
	
};
