'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require ('backbone/node_modules/underscore');

module.exports = Backbone.View.extend({
	tag: 'div',
	initialize: function() {
		_.bindAll(
			this,
			'render'
		)
		this.render();
	},
	render: function() {
		var profileTemplate = _.template($('#profile-view').html());
		this.$el.html(profileTemplate(this.model.toJSON()));
	}
	});