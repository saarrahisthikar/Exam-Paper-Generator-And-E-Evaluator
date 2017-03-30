

// Course schema


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');

// course schema
var CourseSchema = new Schema({
    courseTitle: { type: String, require: true },
    moduleCode: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    // instructor: { type: String }
});

// setting the format of the course title
CourseSchema.plugin(titlize, {
    paths: ['courseTitle']// Array of paths 
});

module.exports = mongoose.model('Course', CourseSchema);