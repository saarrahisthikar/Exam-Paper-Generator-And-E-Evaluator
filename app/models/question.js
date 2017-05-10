
// question schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

//question schema
var QuestionSchema = new Schema({
    question: { type: String, require: true },
    difficultyLevel: { type: String, require: true },
    questionType: { type: String, required: true },
    instructor: { type: String }
});


module.exports = mongoose.model('Question', QuestionSchema);