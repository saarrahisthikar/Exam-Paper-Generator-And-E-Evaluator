angular.module('instructorServices', [])

    .factory('Course', function ($http) {
      
        courseFactory = {};
      
        // creating instructor
        courseFactory.create = function (courseData) {
            return $http.post('/api/createCourse', courseData);
        };

        return courseFactory;

    })
    
    .factory('Question', function ($http) {
    
        questionFactory = {};

        // creating mcq questions
        questionFactory.addMCQ = function (questionData) {
            return $http.post('/api/addMCQQuestion', questionData);
        };

        //creating structured questions
        questionFactory.addStructured = function (questionData) {
            return $http.post('/api/addStructuredQuestion', questionData);
        };

        return questionFactory;

    })

    .factory('Paper', function ($http) {

        paperFactory = {};

        // generate paper
        paperFactory.generate = function (paperData) {
            return $http.post('/api/generatePaper', paperData);
        };

        return paperFactory;

    });

