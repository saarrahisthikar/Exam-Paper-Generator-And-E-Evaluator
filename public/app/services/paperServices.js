angular.module('paperServices', [])

    .factory('PaperDetails', function ($http) {
        paperDetailFactory = {};
        // creating instructor
        paperDetailFactory.getPaperDetails = function (courseID) {
            return $http.get('/api/getPaperDetails/'+courseID);
        };

        return paperDetailFactory;

    });
