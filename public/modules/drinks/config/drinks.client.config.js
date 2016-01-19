'use strict';

// Configuring the Articles module
angular.module('drinks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Drinks', 'drinks', 'dropdown', '/drinks(/create)?');
		//Menus.addSubMenuItem('topbar', 'drinks', 'List Drinks', 'drinks');
		//Menus.addSubMenuItem('topbar', 'drinks', 'New Drink', 'drinks/create');
		Menus.addMenuItem('topbar', 'List Drinks', 'drinks', 'item', '/drinks');
		Menus.addMenuItem('topbar', 'New Drink', 'drinks/create', 'item', '/drinks/create');
	}
]);
