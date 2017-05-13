process.env.NODE_ENV = "test";

var base = process.env.PWD;
var config = require(base +'/config'),
var mongoose = require('mongoose');
var instructor = require(base + '/controller/instructorController');
var Instructor = require(base + '/models/instructor');
var should = require('should');
