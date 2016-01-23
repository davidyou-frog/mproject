module.exports = function(app) {
	
  var Config = app.models.Config;
   Config.create({ 
       id       : 1,
       base_path: '/tmp/',
	   svn_url  : 'svn://svn2/falinux',
	   svn_user : 'username',
	   svn_pass : 'password',
   }, function(err, config) {
   });
   
};
