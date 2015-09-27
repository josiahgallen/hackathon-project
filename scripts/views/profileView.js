'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require ('backbone/node_modules/underscore');
var StudentModel = require('../models/StudentModel.js');
var heroTxt = $('#heroTxt');
module.exports = Backbone.View.extend({
	tag: 'div',
	initialize: function(options) {
		_.bindAll(
			this,
			'render'
		)
		console.log(options);
		this.model = new StudentModel({id: options.id});
		this.model.on('sync',this.render);
		this.model.fetch();
		
	},
	render: function() {
		var profileTemplate = _.template($('#profile-view').html());
		this.$el.html(profileTemplate(this.model.toJSON()));
	}
	});