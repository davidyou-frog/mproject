module.exports = function(app) {
	
	var ds = app.loopback.createDataSource({
        connector: require("loopback-connector-rest"),
        debug: true,
        operations: [
        {
            template: {
                "method": "GET",
                "url": "http://192.168.10.12/api/v3/projects",
                "headers": {
                    "PRIVATE-TOKEN": "MWq_9Vqisj6QJYBJSSy7",
                },
            },
            functions: {
               "list": []
            }
        }
    ]});
	
	var Gitlab = ds.createModel('Gitlab', {
    });

	app.model(Gitlab);
    	
};
