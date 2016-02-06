module.exports = function(app) {
	
	var ds = app.loopback.createDataSource({
        connector: require("loopback-connector-rest"),
        debug: true,
        operations: [
        {
            template: {
                "method": "GET",
                "url": "{url}api/v3/projects",
                "headers": {
					"accept": "application/json",
					"content-type": "application/json",
                    "PRIVATE-TOKEN": "{token}",
                },
            },
            functions: {
               "list": ["url", "token"]
            }
        },
        {
            template: {
                "method": "POST",
                "url": "{url}api/v3/projects",
                "headers": {
					"accept": "application/json",
					"content-type": "application/json",
                    "PRIVATE-TOKEN": "{token}",
                },
				"form": {
                    "name" : "{name}"  
				},
            },
            functions: {
               "create": ["url", "token", "name" ]
            }
        }
    ]});
	
	var Gitlab = ds.createModel('Gitlab', {
    });

	app.model(Gitlab);
    	
};
