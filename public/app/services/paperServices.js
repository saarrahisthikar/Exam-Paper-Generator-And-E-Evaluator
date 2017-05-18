angular.module('paperServices', [])

    .factory('PaperDetails', function ($http) {

        paperDetailFactory = {};

        // all paper details
        paperDetailFactory.getPaperDetails = function (paperInfo) {
            return $http.get('/api/getPaperDetails/' + paperInfo.courseID + '/' + paperInfo.questionType);
        };

        //get public paper details
        paperDetailFactory.getPublicPaperDetails = function (paperInfo) {
            return $http.get('/api/getPublicPaperDetails/' + paperInfo.courseID + '/' + paperInfo.questionType);

        };

        //get a particular paper
        paperDetailFactory.getPaper = function (questionPaperDetails) {
            return $http.get('/api/getPaper/' + questionPaperDetails[0] + '/' + questionPaperDetails[1]);
        };

        //make paper public
        paperDetailFactory.makePublic = function (data) {
            return $http.post('/api/makePublic', data);
        };

        return paperDetailFactory;

    })

    .factory('CheckPaper', function ($http) {

        checkPaperFactory = {};

        // all paper details
        checkPaperFactory.getMarks = function (answers) {
            return $http.post('/api/getPaperMarks', answers);
        };

        return checkPaperFactory;

    });
