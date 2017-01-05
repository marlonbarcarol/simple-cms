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