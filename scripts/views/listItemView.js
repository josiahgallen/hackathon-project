'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require ('backbone/node_modules/underscore');
var profileView = require('./profileView');



module.exports = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		_.bindAll(
			this,
			'render'
			// 'showProfile'

		);
		this.model.on('change', this.render);
		this.render();

	},
	render: function() {
		var listTemplate = _.template($('#student-row').html());
		this.$el.html(listTemplate(this.model.toJSON()));
		$('#searchForm').hide();
	}
});