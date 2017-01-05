app.factory('serviceAPI', function ($http, $location, config, Upload) {
	if( config.auth === undefined || config.auth === null ) {
		$location.path('/login');
		throw new Error("Acesso Negado");
	}

	$http.defaults.headers.common['Authorization'] = 'Basic ' + config.auth;

	var _getRegistries = function(url) {
		return $http.get("/api/" + url);
	}

	var _getRegistry = function(url, id) {
		return $http.get("/api/" + url + '/' + id);
	}

	var _saveRegistry = function(url, data){
		if( data.files != undefined && data.files.length > 0) {
			data.subtitle = [];
			var i = 0;
			for (i=0; i < data.files.length; i++) {
				data.subtitle[i] = data.files[i].subtitle;
			}
		}
		return Upload.upload({
			url: '/api/' + url,
			data: data,
			headers: {'Authorization': 'Basic ' + config.auth},
  			withCredentials: true,
		});
	}

	var _updateRegistry = function (url, data) {
		if( data.files != undefined && data.files.length > 0) {
			data.subtitles = [];
			var i = 0;
			for (i=0; i < data.files.length; i++) {
				data.subtitles[i] = data.files[i].subtitle;
			}
		}
		return Upload.upload({
			url: '/api/' + url + '/' + data.id,
			data: data,
			headers: {'Authorization': 'Basic ' + config.auth},
  			withCredentials: true,
		});
	}

	var _deleteRegistry = function(url, id) {
		return $http.delete("/api/" + url + '/' + id);
	}


	return {
		getRegistries: _getRegistries,
		getRegistry: _getRegistry,
		saveRegistry: _saveRegistry,
		updateRegistry: _updateRegistry,
		deleteRegistry: _deleteRegistry
	};

});