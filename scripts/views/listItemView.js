'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require ('backbone/node_modules/underscore');



module.exports = Backbone.View.extend({
	tagName: 'div',
	initialize: function() {
		_.bindAll(
			this,
			'render'

		);
		this.model.on('change', this.render);
		this.render();

	},
	render: function() {
		console.log('rendeerrrrsssss');
		var listTemplate = _.template($('#student-row').html());
		this.$el.html(listTemplate(this.model.toJSON()));
	}

});