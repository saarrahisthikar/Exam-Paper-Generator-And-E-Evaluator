
// paper schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var mcqQuestion = require('./mcqquestion')

// course schema
var PaperSchema = new Schema({
    paper: [{ type: Schema.Types.Object }]
});


module.exports = mongoose.model('Paper', PaperSchema);