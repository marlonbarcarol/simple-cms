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
