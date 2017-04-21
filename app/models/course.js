

// Course schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var question = require('./question');
var questionPaper = require('./paper');
var student = require('./student')

// course schema
var CourseSchema = new Schema({
    courseTitle: { type: String, require: true },
    moduleCode: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    questions: [{ type: Schema.Types.ObjectId, ref: question }],
    questionPaper: [{ type: Schema.Types.ObjectId, ref: questionPaper }],
    instructorUsername: { type: String },
    students: [{ type: Schema.Types.ObjectId, ref: student }]
});

// setting the format of the course title
CourseSchema.plugin(titlize, {
    paths: ['courseTitle']// Array of paths 
});

module.exports = mongoose.model('Course', CourseSchema);