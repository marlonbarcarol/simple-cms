"use strict";

CKEDITOR.config.toolbar_CUSTOM = [
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
	{ name: 'styles', items: [ 'Styles', 'Format' ] },
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Scayt' ] },
	{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
	{ name: 'insert', items: [ 'Table', 'HorizontalRule', 'SpecialChar' ] },
	{ name: 'tools', items: [ 'Maximize' ] },
	{ name: 'others', items: [ '-' ] },
];

var app = angular.module("app", ["ngRoute", "ngFileUpload", "CKEditor"]);

app.run(function($rootScope, $route, $injector) {
    $rootScope.user = (JSON.parse( sessionStorage.getItem('user') ) == null) ? null : JSON.parse( sessionStorage.getItem('user') );

	$rootScope.$on('$routeChangeSuccess', function() {
		document.title = $route.current.title || "Content Manager System - CMS";
	});

	$rootScope.formData = {};
	$rootScope.message = '';

});

angular.module("CKEditor", [])
	.directive('ckEditor', function () {
	    return {
	        require: '?ngModel',
	        link: function (scope, elm, attr, ngModel) {
	            var ck = CKEDITOR.replace(elm[0], { toolbar:'CUSTOM'});

	            if (!ngModel) return;
	            ck.on('instanceReady', function () {
	                ck.setData(ngModel.$viewValue);
	            });
	            function updateModel() {
	                scope.$apply(function () {
	                ngModel.$setViewValue(ck.getData());
	            });
	        }
	        ck.on('change', updateModel);
	        ck.on('key', updateModel);
	        ck.on('dataReady', updateModel);

	        ngModel.$render = function (value) {
	            ck.setData(ngModel.$viewValue);
	        };
	    }
	};
});

app.constant("config",
	{
		baseUrl: "http://localhost",
		auth: (JSON.parse( sessionStorage.getItem('user') ) == null) ? null : JSON.parse( sessionStorage.getItem('user') ).auth,
		user: (JSON.parse( sessionStorage.getItem('user') ) == null) ? null : JSON.parse( sessionStorage.getItem('user') ),
	}
);
app.config(function ($routeProvider, $locationProvider) {
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		});
    }

	$routeProvider.when('/', {
		templateUrl: 'view/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	});

	$routeProvider.when('/dashboard', {
		templateUrl: 'view/dashboard.html',
		controller: 'dashboardCtrl',
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	});

	$routeProvider.when('/login', {
		templateUrl: 'view/login.html',
		controller: 'loginCtrl',
		resolve: {
			auth: function(config, $location) {
				if( config.auth != null ) {
					$location.path('/dashboard');
					throw new Error("Access Denied");
				}
			}
		}
	}).when('/logout', {
		templateUrl: 'view/login.html',
		controller: 'logoutCtrl'
	});

	/* USER */
	$routeProvider.when('/user', {
		templateUrl: 'view/user/user.html',
		controller: 'userCtrl',
		title: "User - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			users: function(serviceAPI) {
				return serviceAPI.getRegistries('user').then(function (response) {
					return response.data;
				});
			}
		}
	}).when('/user/add', {
		templateUrl: 'view/user/user-add.html',
		controller: 'userAddCtrl',
		title: "Users - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	}).when('/user/:id', {
		templateUrl: 'view/user/user-edit.html',
		controller: 'userEditCtrl',
		title: "Users - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			user: function(serviceAPI, $route) {
				return serviceAPI.getRegistry('user', $route.current.params.id).then(function (response) {
					return response.data;
				});
			}
		}
	});

	/* SERVICES */
	$routeProvider.when('/service', {
		templateUrl: 'view/service/service.html',
		controller: 'serviceCtrl',
		title: "Services - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			pages: function(serviceAPI) {
				return serviceAPI.getRegistries('service').then(function (response) {
					return response.data;
				});
			}
		}
	}).when('/service/add', {
		templateUrl: 'view/service/service-add.html',
		controller: 'serviceAddCtrl',
		title: "Services - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	}).when('/service/:id', {
		templateUrl: 'view/service/service-edit.html',
		controller: 'serviceEditCtrl',
		title: "Services - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			registry: function(serviceAPI, $route) {
				return serviceAPI.getRegistry('service', $route.current.params.id).then(function (response) {
					return response.data;
				});
			}
		}
	});

	/* ABOUT */
	$routeProvider.when('/about', {
		templateUrl: 'view/about/about.html',
		controller: 'aboutCtrl',
		title: "About - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			registries: function(serviceAPI) {
				return serviceAPI.getRegistries('about').then(function (response) {
					return response.data;
				});
			}
		}
	}).when('/about/add', {
		templateUrl: 'view/about/about-add.html',
		controller: 'aboutAddCtrl',
		title: "About - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	}).when('/about/:id', {
		templateUrl: 'view/about/about-edit.html',
		controller: 'aboutEditCtrl',
		title: "About - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			registry: function(serviceAPI, $route) {
				return serviceAPI.getRegistry('about', $route.current.params.id).then(function (response) {
					return response.data;
				});
			}
		}
	});

	/* CONTACT */
	$routeProvider.when('/contact', {
		templateUrl: 'view/contact/contact.html',
		controller: 'contactCtrl',
		title: "Contact - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			registries: function(serviceAPI) {
				return serviceAPI.getRegistries('contact').then(function (response) {
					return response.data;
				});
			}
		}
	}).when('/contact/add', {
		templateUrl: 'view/contact/contact-add.html',
		controller: 'contactAddCtrl',
		title: "Contact - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			}
		}
	}).when('/contact/:id', {
		templateUrl: 'view/contact/contact-edit.html',
		controller: 'contactEditCtrl',
		title: "Contact - CMS",
		resolve: {
			auth: function(config, $location) {
				if( config.auth === undefined || config.auth === null ) {
					$location.path('/login');
					throw new Error("Access Denied");
				}
			},
			registry: function(serviceAPI, $route) {
				return serviceAPI.getRegistry('contact', $route.current.params.id).then(function (response) {
					return response.data;
				});
			}
		}
	});

	$routeProvider.otherwise({
			redirectTo: "/dashboard"
		}
	);

});
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
app.controller('loginCtrl', function($scope, $http, $location, config) {
	$scope.isLoading = false;
	$scope.message = false;

	$scope.sendForm = function() {
		angular.element('#login .message').addClass("loading");
		$scope.isLoading = true;

		$http({
			method : "POST",
			url : "/api/login",
			data: $.param( $scope.formData ),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function (response) {
			sessionStorage.setItem( 'user', JSON.stringify(response.data) );
			window.location = '/cms/dashboard';
			$scope.isLoading = false;
			$scope.message = false;
		}).catch(function (response) {
			console.log(response);
			$scope.isLoading = false;
			$scope.message = response.data.response;
		})
	}
});

app.controller('logoutCtrl', function($location, config) {
	sessionStorage.clear();
	config.auth = null;
	$location.path('/login');
});
app.controller('dashboardCtrl', function($scope) {
	$scope.module = 'Dashboard';
});
app.controller('userCtrl', function($scope, $http, users) {
	$scope.module = "Users";
	$scope.url = "user";

	$scope.users = users;
});
app.controller('userAddCtrl', function($scope, sendForm) {
	$scope.module = "Users";
	$scope.url = "user";
	$scope.formData.type = "user";
	$scope.addRegistry = sendForm.addRegistry;
});
app.controller('userEditCtrl', function($scope, user, sendForm) {
	$scope.module = "Users";
	$scope.url = "user";
	$scope.user = user;
	$scope.editRegistry = sendForm.editRegistry;
});
app.controller('aboutCtrl', function($scope, registries) {
	$scope.module = "About";
	$scope.url = "about";
	
	$scope.registries = registries;
});
app.controller('aboutAddCtrl', function($scope, sendForm) {
	$scope.module = "About";
	$scope.url = "about";
	$scope.addRegistry = sendForm.addRegistry;
});
app.controller('aboutEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "About";
	$scope.url = "about";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});
app.controller('serviceCtrl', function($scope, $http, pages) {
	$scope.module = "Services";
	$scope.url = "service";
	
	$scope.pages = pages;
});
app.controller('serviceAddCtrl', function($scope, sendForm) {
	$scope.module = "Services";
	$scope.url = "service";
	$scope.addRegistry = sendForm.addRegistry;
});
app.controller('serviceEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "Services";
	$scope.url = "service";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});
app.controller('contactCtrl', function($scope, registries) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.registries = registries;
});
app.controller('contactAddCtrl', function($scope, contatoAPI, sendForm) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.addRegistry = sendForm.addRegistry;

});
app.controller('contactEditCtrl', function($scope, registry, sendForm) {
	$scope.module = "Contacts";
	$scope.url = "contact";
	$scope.registry = registry;
	$scope.editRegistry = sendForm.editRegistry;
});
app.directive('routeLoading', function ($rootScope) {
  return {
	restrict:'A',
	template:"<h1 ng-if='isRouteLoading'>Loading...</h1>",
	link:function(scope, elem, attrs){
	  scope.isRouteLoading = false;

	  $rootScope.$on('$routeChangeStart', function(){
		scope.isRouteLoading = true;
	  });

	  $rootScope.$on('$routeChangeSuccess', function(){
		scope.isRouteLoading = false;
	  });
	}
  };
});
app.directive('slider', function () {  
    return {  
        restrict: 'A',  
        link: function (scope, element, attrs) {  
            var options = scope.$eval($(element).attr('data-options'));
            $(element).owlCarousel(options);  
        }  
    };  
});
app.directive('map', function () {  
    return {  
        restrict: 'A', 
        link: function (scope, element, attrs) {  
            var mapOptions = {
				scrollwheel: false,
				center: new google.maps.LatLng(attrs.latitude, attrs.longitude),
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(element[0],mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(attrs.latitude, attrs.longitude),
				scrollwheel: false,
				map: map,
				//icon: 'css/images/ico-maps-pin.png',
			});
        }  
    };  
});
app.directive('delete', function ($injector, serviceAPI) {
    return {  
        restrict: 'A',
        link: function (scope, element, attrs) {

        	$(element).on('click', function(event){
        		event.preventDefault();
                if( !confirm("Are you sure you want to delete this record?") ) {
                    return false;
                }
                
        		serviceAPI.deleteRegistry(attrs.url, attrs.id).then(function(response) {
        			$(element).parents('tr').fadeIn().remove();
        		}).catch(function (response) {
                    $(".message").addClass("alert").text('Error to delete record.');
				});
        	});

        }  
    };  
});