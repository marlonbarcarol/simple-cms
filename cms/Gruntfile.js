module.exports = function(grunt) {

	grunt.initConfig({

		concat: {
			lib: {
				src: [
					/* JQUERY */
					'assets/lib/jquery/dist/jquery.min.js',

					/* SUMMERNOTE 
					'assets/lib/summernote/dist/summernote.min.js',
					'assets/lib/summernote/dist/lang/summernote-pt-BR.min.js',
					*/
					/* ANGULAR */
					'assets/lib/angular/angular.min.js',
					/* ANGULAR ROUTE */
					'assets/lib/angular-route/angular-route.min.js',
					/* SUMMERNOTE 
					'assets/lib/angular-summernote/dist/angular-summernote.min.js',
					*/
					/* ANGULAR NG-FILE-UPLOAD */
					'assets/lib/ng-file-upload/ng-file-upload.min.js',
					'assets/lib/ng-file-upload-shim/ng-file-upload-shim.min.js',
					
				  	'assets/lib/foundation/js/foundation.min.js',
/*				  	'assets/lib/owl.carousel/dist/owl.carousel.min.js',
				  	'assets/lib/jquery-mask-plugin/dist/jquery.mask.min.js',*/
				],
				dest: 'assets/js/lib.concat.js',
			},
			custom: {
				src: [
					'assets/js/app.js',
					'assets/js/values/values.js',
					'assets/js/config/config.js',

					'assets/js/services/service.js',
					'assets/js/services/send-form.js',

					'assets/js/controllers/login.js',
					'assets/js/controllers/logout.js',
					'assets/js/controllers/dashboard.js',

					'assets/js/controllers/user/user.js',
					'assets/js/controllers/user/user-add.js',
					'assets/js/controllers/user/user-edit.js',

					'assets/js/controllers/about/about.js',
					'assets/js/controllers/about/about-add.js',
					'assets/js/controllers/about/about-edit.js',

					'assets/js/controllers/service/service.js',
					'assets/js/controllers/service/service-add.js',
					'assets/js/controllers/service/service-edit.js',

					'assets/js/controllers/contact/contact.js',
					'assets/js/controllers/contact/contact-add.js',
					'assets/js/controllers/contact/contact-edit.js',

					'assets/js/directives/route-loading.js',
					'assets/js/directives/slider.js',
					'assets/js/directives/map.js',
					'assets/js/directives/delete-button.js',
				],
				dest: 'assets/js/app.concat.js',
			},
		},

		sass: {
			lib: {
				options: {
					style: 'compressed'
				},
				files: {
					'assets/css/lib.min.css': 'assets/scss/lib.scss',
				}
			},
			custom: {
				options: {
					style: 'compressed'
				},
				files: {
					'assets/css/app.min.css': 'assets/scss/app.scss',
				}
			}
		},

		watch: {
			js: {
				files: [
					'assets/js/**/*.js',
				],
				tasks: ['concat:custom'],
				options: {
					spawn: false,
				}
			},
			scss: {
				files: [
					'assets/scss/**/*.scss',
				],
				tasks: ['sass:custom'],
				options: {
					spawn: false,
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', 'watch');
	grunt.registerTask('lib', ['concat:lib', 'sass:lib']);
	grunt.registerTask('custom', ['concat:custom', 'sass:custom']);

};