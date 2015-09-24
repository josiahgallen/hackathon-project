'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		f_name: '',
		l_name: '',
		email: '',
		bio: '',
		linked_in: '',
		github: '',
		employed: false,
		where: '',
		city: '',
		state: '',
		start_date: '',
		end_date: '',
		course_name: ''
	},
	urlRoot: '',
	idAttribute: '_id'
});