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
            '' : 'goHome',
            'searchStudents': 'goSearchForm',
            'addProfile': 'goAdd',
            'searchStudents/:location/:course': 'searchResults'
        },

        showProfile: function(id){
            var viewProfile = new profileView({id: id});
            $profile.html(viewProfile.$el);
            $studentList.hide();
            $profile.show();
            $searchForm.hide();
            $('#hpCards').hide();
            $('.heroTxt').text('');
            $('.heroImg').css('height', '20em');
            $('.heroImg').css('background', 'url("../images/employers-img.png")');
            $('.heroImg').css('background-repeat', 'no-repeat');
            $('.heroImg').css('background-size', 'cover');
            $('#view-all').hide();
        },
        goHome: function(e) {
            $profile.hide();
            $searchForm.show();
        },
        goSearchForm: function(e) {
            $('#hpCards').hide('fast');
            $('select').css('display', 'block');
            $('#searchButton').css('display', 'block');
            $('.heroImg').css('height', '17em');
             $('.heroImg').css('background', 'url("../images/student_profile.png")');
            $('.heroImg').css('background-repeat', 'no-repeat');
            $('.heroImg').css('background-size', 'cover');
        },
        goAdd: function(e) {
            $('#hpCards').hide('fast');
            $('#createProfile').show();
            $('#cohortSelect').css('display', 'block');
            $('#employed').css('display', 'block');
            $('.heroImg').css('height', '17em');
            $('.heroImg').css('background', 'url("../images/student_profile.png")');
            $('.heroImg').css('background-repeat', 'no-repeat');
            $('.heroImg').css('background-size', 'cover');
            $('#createPbutton').css('display', 'block');
            $('.heroTxt').text('Create Your Profile');
        },
        searchResults: function(location, course) {
            console.log(location, course);
            $('#hpCards').hide();
            //console.log(url + '/' + location + '/' + course);
            $.get(
                url + '/' + location + '/' + course,
                function(response) {
                    students.add(response);
                    console.log(students);
                    $searchForm.hide('fast');
                },
                'json'
            )
        }
    })

    var alum = new Router();
    Backbone.history.start();

    $searchForm.submit(function(e) {
        e.preventDefault();
        $('.heroImg').css('height', '17em');
        var location = $locationSearch.val();
        var course = $courseSearch.val();
        alum.navigate('searchStudents/' + location + '/' + course, {trigger: true});
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
        var newProfile = new StudentModel({
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
        console.log(newProfile.attributes);
        $.post(url+'/students',newProfile.attributes).done(function(res){
            console.log('ran and got back', res);
            students.add(res);
        });

        $('#createProfile').hide();
        $('#cohortSelect').css('display', 'none');
        $('#employed').css('display', 'none');
    })

    $('#view-all').click(function(e) {
        e.preventDefault();
        $.get(
            url + '/students',
            function(response) {
                students.add(response);
                console.log(students);
                //$searchForm.hide('slow');
                $('#hpCards').hide('fast');
                $('.heroImg').css('height', '10em');
                $('#createProfile').hide();
                $('#cohortSelect').css('display', 'none');
                $('#employed').css('display', 'none');
            },
            'json'
        )
        console.log(url+'/students');
    })

    students.on('add', function(newProfile){
        var listView = new listItemView({model: newProfile})
        $studentList.append(listView.$el);

    })
});
