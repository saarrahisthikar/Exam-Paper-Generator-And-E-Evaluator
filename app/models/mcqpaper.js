
// paper schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var mcqQuestion = require('./mcqquestion')

// course schema
var MCQPaperSchema = new Schema({
    difficultyLevel: { type: String, require: true },
    public: { type: String, default: false },
    moduleCode: { type: String, require: true, unique: true },
    instructor: { type: String },
    totalQuestions: { type: Number },
    question: [{ type: Schema.Types.ObjectId, ref: mcqQuestion }]
});


module.exports = mongoose.model('MCQPaper', MCQPaperSchema);