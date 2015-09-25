'use strict';

var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('./models/StudentModel.js');
var StudentCollection = require('./collections/StudentCollection.js');

$(document).ready(function() {

    var $searchForm = $('#searchForm');
    var $locationSearch = $('#locationSearch');
    var $courseSearch = $('#courseSearch');

    var url = 'http://iron-alum.herokuapp.com'; //url will change based server setup
    var studentTemplate = _.template($('#student-row').html());

    var students = new StudentCollection();

    $searchForm.submit(function(e) {
        e.preventDefault();
        var location = $locationSearch.val();
        var course = $courseSearch.val();
        console.log(url + '/' + location + '/' + course);
        $.get(
            'http://tiyfe.herokuapp.com/collections/josiah-hackathontest',//pizza-server test
            function(response) {
                students.add(response);
                console.log(students);
            },
            'json'
        )
    })


});
