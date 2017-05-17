
var MCQPaper = require('../app/models/mcqPaper');
var StructuredPaper = require('../app/models/structuredpaper');

module.exports = function (questionType, courseID) {

    if (questionType == 'mcq') {
        MCQPaper.find({ moduleCode: courseID }).select().exec(function (err, paper) {
            if (err) return false;
            return true;
        });
    } else if (questionType == 'structured') {
        StructuredPaper.find({ moduleCode: courseID }).select().exec(function (err, paper) {
            if (err) return false;
            return true;
        });
    } else {
        return false;
    }
}