"use strict";
var app = angular.module("app", ["ngMessages","ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
	if(window.history && window.history.pushState){
     $locationProvider.html5Mode({
             enabled: true,
             requireBase: true
      });
    }

	$routeProvider.
		when('/movel/new', {
			templateUrl: 'view/movel-new.html',
			controller: 'mainCtrl'
		}).
		when('/movel/:movelId', {
			templateUrl: 'view/movel-detail.html',
			controller: 'mainCtrl'
		}).
		when('/moveis', {
			templateUrl: 'view/movel-list.html',
			controller: 'mainCtrl'
		}).
		otherwise({
			redirectTo: '/moveis'
  		});
});
app.controller("mainCtrl", function ($scope, moveisAPI, config) {
	$scope.app = "Teste";

	// PATTERNS - NG-PATTERNS
	$scope.onlyWord = /^\s*\w*\s*$/;
	$scope.onlyNumber = /^\d+$/;
	$scope.numberDotNumber = /^[0-9]+(?:\.[0-9]+)?$/;

	// Móveis
	$scope.loadMoveis = function () {
		$scope.moveis = moveisAPI.getMoveis();
	}

	$scope.addMovel = function (movel, medida) {
		$scope.moveis = moveisAPI.saveMovel(angular.copy(movel), angular.copy(medida));
		delete $scope.movel;
		$scope.movelForm.$setPristine();
	};

	$scope.apagarMoveis = function (moveis) {
		$scope.moveis = moveis.filter(function (movel) {
			if (!movel.selecionado) 
				return movel;
		});
	};

	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	$scope.log = function (campo) {
		console.log(campo);
	};

	$scope.validClass = function (campo, classeQuandoValido, classeQuandoInvalido) {
		if(campo.$valid){
			return classeQuandoValido;
		}else{
			return classeQuandoInvalido;
		}
	};

	$scope.validSelect = function (campo) {
		$scope.medida.altura
	};

	// Medidas
	$scope.loadMedidas = function () {
		$scope.medidas = moveisAPI.getMedidas();
	}

	// Load itens
	$scope.loadMoveis();
	$scope.loadMedidas();
});


app.directive('validNumber', function() {
	return {
		require: '?ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			if(!ngModelCtrl) {
				return; 
			}

			ngModelCtrl.$parsers.push(function(val) {
				if (angular.isUndefined(val)) {
					var val = '';
				}
				var clean = val.replace(/[^0-9\.]/g, '');
				var decimalCheck = clean.split('.');

				if(!angular.isUndefined(decimalCheck[1])) {
					decimalCheck[1] = decimalCheck[1].slice(0,2);
					clean =decimalCheck[0] + '.' + decimalCheck[1];
				}

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			});

			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});
		}
	};
});
app.factory("moveisAPI", function () {
	//Móveis
	var _moveis = [
		{imagem: "blabal.jpg", codigo: "423423", nome: "teste", altura: "33", largura: "2", profundidade: "12", descricao: "blabalbalablabla", camadas: [{image: "yyy.yyyy.yyyy"}, {image: "yyy.yyyy.yyyy"}]}	
	];

	var _medidas = [
		{id: "cm", medida: "Centrimetros",},
		{id: "m",medida: "Metros",}
	];

	var _getMoveis = function () {
		return _moveis;
	};

	var _getMedidas = function () {
		return _medidas;
	};

	var _saveMovel = function (movel, medida){
		movel.altura = movel.altura+" "+medida.altura;
		movel.largura = movel.largura+" "+medida.largura;
		movel.profundidade = movel.profundidade+" "+medida.profundidade;
		_moveis.push(movel);
		return _moveis;
	};

	return {
		getMoveis: _getMoveis,
		saveMovel: _saveMovel,
		getMedidas: _getMedidas
	};
});
app.constant("config", { baseUrl: "http://localhost" });