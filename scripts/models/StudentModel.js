'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		f_name: '',
		l_name: '',
		email: '',
		bio: '',
		linked_in: '',
		github: '',
		employed: false,
		place_employed: null,
		city: '',
		state: '',
		course_name: '',
		cohort_id: ''


	},
	urlRoot: 'http://iron-alum.herokuapp.com/students',
	idAttribute: 'id'
});