angular.module('paperServices', [])

    .factory('PaperDetails', function ($http) {
        paperDetailFactory = {};
        // creating instructor
        paperDetailFactory.getPaperDetails = function (paperInfo) {
             return $http.get('/api/getPaperDetails/'+paperInfo.courseID+'/'+paperInfo.questionType);
        };

        paperDetailFactory.getPaper =function(questionPaperDetails){
            return $http.get('/api/getPaper/'+questionPaperDetails[0]+'/'+questionPaperDetails[1]);
        };

        return paperDetailFactory;

    });
