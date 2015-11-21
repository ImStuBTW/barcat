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
