
// paper schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var structuredQuestion = require('./structuredquestion')

// structured paper schema
var StructuredPaperSchema = new Schema({
    difficultyLevel: { type: String, require: true },
    public: { type: String, default: false },
    paperNo: { type: String },
    moduleCode: { type: String, require: true},
    instructor: { type: String },
    totalQuestions: { type: Number },
    question: [{ type: Schema.Types.Object, ref: structuredQuestion }]
});


module.exports = mongoose.model('StructuredPaper', StructuredPaperSchema);