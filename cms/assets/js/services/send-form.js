app.factory('sendForm', function ($location, config, $rootScope, serviceAPI) {
	if( config.auth === undefined || config.auth === null ) {
		$location.path('/login');
		throw new Error("Acesso Negado");
	}

	var _addRegistry = function (url, registry, successText, errorText) {
		$("body").append('<div class="spinner"></div>');
		return serviceAPI.saveRegistry( url, registry ).then(function (response) {
			$(".message").addClass("success").text(successText ? successText : "Successfully registered!");
			$(".spinner").remove();
			$rootScope.formData = undefined;
			$rootScope.formData = {};
			return response.data;
		}).catch(function (response) {
			$rootScope.formData = undefined;
			$rootScope.formData = {};
			$(".message").addClass("alert").text(errorText ? errorText : 'Fail to delete record..');
			$(".spinner").remove();
		});
	}

	var _editRegistry = function (url, registry, successText, errorText) {
		$("body").append('<div class="spinner"></div>');
		return serviceAPI.updateRegistry( url, registry ).then(function (response) {
			$(".message").addClass("success").text('Successfully edited!');
			$(".spinner").remove();
			return response.data;
		}).catch(function (response) {
			$(".message").addClass("alert").text('Fail to edit.');
			$(".spinner").remove();
		});
	}

	return {
		addRegistry: _addRegistry,
		editRegistry: _editRegistry,
	};

});