'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Drink Schema
 */
var DrinkSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Drink name',
		trim: true
	},
	ingredients: [{
		amount: {
			type: String,
			default: '0',
			enum: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
		},
		amountfraction: {
			type: String,
			default: '',
			enum: ['', '⅛', '¼', '⅓', '½', '⅔', '¾']
		},
		unit: {
			type: String,
			default: 'oz',
			enum: ['oz', 'ml', 'dash', 'tsp', 'tbsp', 'cup', 'pint', 'cl', 'l', 'drop', 'pinch']
		},
		name: {
			type: String,
			default: '',
			trim: true
		}
	}],
	directions: {
		type: String,
		default: '',
		trim: true
	},
	credit: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Drink', DrinkSchema);
