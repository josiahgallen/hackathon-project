'use strict';

var Backbone = require('backbone');
var StudentModel = require('../models/StudentModel.js');

module.exports = Backbone.Collection.extend({
	model: StudentModel,
	url: 'http://iron-alum.herokuapp.com'
})