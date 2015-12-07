'use strict';

// Drinks controller
angular.module('drinks').controller('DrinksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Drinks',
	function($scope, $stateParams, $location, Authentication, Drinks) {
		$scope.authentication = Authentication;
		$scope.ingredients = [];

		// Add new Ingredient entries
		$scope.addIngredient = function() {
			var ingredient = {amount: '0', amountfraction: '', unit: 'oz', name: ''};

			$scope.drink.ingredients.push(ingredient);
		};

		// Remove existing Ingredient entry
		$scope.removeIngredient = function(array, index) {
			array.splice(index, 1);
		};

		// Add new Ingredient entries
		$scope.addCreateIngredient = function() {
			var ingredient = {amount: '0', amountfraction: '', unit: 'oz', name: ''};

			$scope.ingredients.push(ingredient);
		};

		// Remove existing Ingredient entry
		$scope.removeCreateIngredient = function(array, index) {
			array.splice(index, 1);
		};

		// Create new Drink
		$scope.create = function() {
			// Create new Drink object
			var drink = new Drinks ({
				name: this.name,
				ingredients: this.ingredients,
				directions: this.directions,
				credit: this.credit
			});

			// Redirect after save
			drink.$save(function(response) {
				$location.path('drinks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Drink
		$scope.remove = function(drink) {
			if ( drink ) {
				drink.$remove();

				for (var i in $scope.drinks) {
					if ($scope.drinks [i] === drink) {
						$scope.drinks.splice(i, 1);
					}
				}
			} else {
				$scope.drink.$remove(function() {
					$location.path('drinks');
				});
			}
		};

		// Update existing Drink
		$scope.update = function() {
			var drink = $scope.drink;

			drink.$update(function() {
				$location.path('drinks/' + drink._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Drinks
		$scope.find = function() {
			$scope.drinks = Drinks.query();
		};

		// Find existing Drink
		$scope.findOne = function() {
			$scope.drink = Drinks.get({
				drinkId: $stateParams.drinkId
			});
		};
	}
]);
