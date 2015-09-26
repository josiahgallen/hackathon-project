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
    var $createProfile = $('#createProfile');

    var url = 'http://iron-alum.herokuapp.com'; 

    var students = new StudentCollection;

    var Router = Backbone.Router.extend({
        routes:{
            'students/:id' : 'showProfile',
            '' : 'goHome'
        },

        showProfile: function(id){
            var viewProfile = new profileView({id: id});
            $profile.html(viewProfile.$el);
            $studentList.hide();
            $profile.show();
            $searchForm.hide();
        },
        goHome: function(e) {
            $profile.hide();
            $searchForm.show();
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

    $createProfile.submit(function(e) {
        e.preventDefault();
        var where = '1';
        var employed = false;
        var cohortInt = parseInt($('#cohortSelect').val());
        if (cohortInt <= 3) {
            where = '1'
        } else if (cohortInt > 3 && cohortInt <= 6) {
            where = '2'
        } else {
            where = '3'
        }
        if ($('#employed').val() === 'true') {
            employed = true;
        }
        var newProfile = new StudentModel();
        newProfile.save({
            f_name: $('#f_name').val(),
            l_name: $('#l_name').val(),
            email: $('#email').val(),
            bio: $('#bio').val(),
            linked_in: $('#linked_in').val(),
            github: $('#github').val(),
            employed: employed,
            cohort_id: $('#cohortSelect').val(),
            location_id: where

        });
        console.log(newProfile);
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
