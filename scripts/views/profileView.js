'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require ('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel.js');

module.exports = Backbone.View.extend({
	tag: 'div',
	initialize: function(options) {
		_.bindAll(
			this,
			'render'
		)
		console.log(options);
		this.model = new StudentModel({id: options.id});
		this.model.fetch();
		this.render();
	},
	render: function() {
		var profileTemplate = _.template($('#profile-view').html());
		this.$el.html(profileTemplate(this.model.toJSON()));
	}
	});