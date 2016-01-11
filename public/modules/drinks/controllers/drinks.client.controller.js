'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used below.
angular.module('drinks').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

// Drinks controller
angular.module('drinks').controller('DrinksController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Drinks',
	function($scope, $stateParams, $location, $modal, Authentication, Drinks) {
		$scope.authentication = Authentication;
		$scope.ingredients = [];

		$scope.rating = '😺';

		// Modal Stuff
		$scope.glassList = ['Rocks', 'Collins', 'Highball', 'Snifter', 'Coupe', 'Cocktail', 'Nick&Nora', 'Port', 'Flute', 'Irish', 'Tropical', 'Julep', 'Mule'];
		$scope.glass = 'Rocks';
		$scope.colorList = ['red', 'green', 'blue'];
		$scope.color = 'red';
		$scope.iceList = ['None', 'Single', 'Cubes', 'Crushed'];
		$scope.ice = 'None';
		$scope.citrusList = ['None', 'Lemon Twist', 'Lemon Wedge', 'Lemon Peel', 'Lime Twist', 'Lime Wedge', 'Lime Twist', 'Orange Twist', 'Orange Peel', 'Orange Twist'];
		$scope.citrus = 'None';
		$scope.garnishList = ['None', 'Cherry', 'Strawberry', 'Apple', 'Olive', 'Celery', 'Pineapple', 'Cucumber'];
		$scope.garnish = 'None';
		$scope.extrasList = ['None', 'Umbrella', 'Salt', 'Straw', 'Whiped Cream', 'Mint'];
		$scope.extras = 'None';

		$scope.open = function (templateUrl, modalItems, chosenItems) {
			var modalInstance = $modal.open({
			  templateUrl: templateUrl,
			  controller: 'ModalInstanceCtrl',
			  resolve: {
			    items: function () {
			      return modalItems;
			    }
			  }
			});

			modalInstance.result.then(function (selectedItem) {
			  $scope[chosenItems] = selectedItem;
			});
		};


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
				credit: this.credit,
				rating: this.rating
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
