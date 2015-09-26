'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('./models/StudentModel.js');
var StudentCollection = require('./collections/StudentCollection.js');
var listItemView = require('./views/listItemView.js');
var profileView = require('./views/profileView.js');

$(document).ready(function() {

    var $searchForm = $('#searchForm');
    var $locationSearch = $('#locationSearch');
    var $courseSearch = $('#courseSearch');
    var $studentList = $('#student-list');
    var $profile = $('#profile-page');

    var url = 'http://iron-alum.herokuapp.com'; 

    var students = new StudentCollection;

    var Router = Backbone.Router.extend({
        routes:{
            'students/:id' : 'showProfile'

        },

        showProfile: function(id){
            var viewProfile = new profileView({id: id});
            $profile.html(viewProfile.$el);
            $studentList.hide();
            $profile.show();
            $searchForm.hide();
        }

    })

    $searchForm.submit(function(e) {
        e.preventDefault();
        var location = $locationSearch.val();
        var course = $courseSearch.val();
        console.log(url + '/' + location + '/' + course);
        $.get(
            url + '/' + location + '/' + course,
            function(response) {
                students.add(response);
                console.log(students);
                $searchForm.hide('fast');
            },
            'json'
        )
    })

    $('#view-all').click(function(e) {
        e.preventDefault();
        $.get(
            url + '/students',
            function(response) {
                students.add(response);
                console.log(students);
                $searchForm.hide('slow');
            },
            'json'
        )
        console.log(url+'/students');
    })

    students.on('add', function(newProfile){
        var listView = new listItemView({model: newProfile})
        $studentList.append(listView.$el);

    })
    var alum = new Router();
    Backbone.history.start();

});
