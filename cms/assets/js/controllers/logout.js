app.controller('logoutCtrl', function($location, config) {
	sessionStorage.clear();
	config.auth = null;
	$location.path('/login');
});