'use strict';

var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
var StudentModel = require('./models/StudentModel.js');
var StudentCollection = require('./collections/StudentCollection.js');
var listItemView = require('./views/listItemView.js')

$(document).ready(function() {

    var $searchForm = $('#searchForm');
    var $locationSearch = $('#locationSearch');
    var $courseSearch = $('#courseSearch');
    var $studentList = $('#student-list');

    var url = 'http://iron-alum.herokuapp.com'; //url will change based server setup
   

    var students = new StudentCollection;

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
                $searchForm.hide('slow');
            },
            'json'
        )
    })

    students.on('add', function(newProfile){
        var listView = new listItemView({model: newProfile})
        $studentList.append(listView.$el);

    })


});
