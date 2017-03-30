
// paper schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

// course schema
var PaperSchema = new Schema({
    difficultyLevel: { type: String, require: true },
    structure: { type: String, require: true },
    public: { type: String },
    moduleCode: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    instructor: { type: String }
});


module.exports = mongoose.model('Paper', PaperSchema);