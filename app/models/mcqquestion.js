
// mcq question schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

// mcq question schema
var MCQQuestionSchema = new Schema({
    moduleCode: { type: String, require: true },
    question: { type: String, require: true },
    difficultyLevel: { type: String, require: true },
    correctAns: { type: String, require: true },
    wrongAns1: { type: String, require: true },
    wrongAns2: { type: String, require: true },
    wrongAns3: { type: String, require: true },
    wrongAns4: { type: String, require: true },
    instructor: { type: String },
    occurence:{type:Number, require:true}
});


module.exports = mongoose.model('MCQQuestion', MCQQuestionSchema);