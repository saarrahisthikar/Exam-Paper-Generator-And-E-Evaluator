angular.module('paperServices', [])

    .factory('PaperDetails', function ($http) {
        paperDetailFactory = {};
        // creating instructor
        paperDetailFactory.getPaperDetails = function (paperInfo) {
             return $http.get('/api/getPaperDetails/'+paperInfo.courseID+'/'+paperInfo.questionType);
        };

        return paperDetailFactory;

    });
