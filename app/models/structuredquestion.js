
// structured question schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

// structured question schema
var StructuredQuestionSchema = new Schema({
    // addmodule code
    moduleCode: { type: String, require: true },
    question: { type: String, require: true },
    difficultyLevel: { type: String, require: true },
    keyWord1: { type: String, require: true },
    keyWord2: { type: String, require: true },
    keyWord3: { type: String, require: true },
    keyWord4: { type: String, require: true },
    instructor: { type: String }
});


module.exports = mongoose.model('StructuredQuestion', StructuredQuestionSchema);