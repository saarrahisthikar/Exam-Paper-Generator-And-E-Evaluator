
// paper schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var mcqQuestion = require('./mcqquestion')

// course schema
var MCQPaperSchema = new Schema({
    difficultyLevel: { type: String, require: true },
    paperNo: { type: String },
    public: { type: String, default: false },
    moduleCode: { type: String, require: true },
    instructor: { type: String },
    totalQuestions: { type: Number },
    question: [{ type: Schema.Types.Object, ref: mcqQuestion }]
});


module.exports = mongoose.model('MCQPaper', MCQPaperSchema);