var express = require('express');
var app = express();
var port = process.env.port || 3000;
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router()
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

var User = require('./app/models/user');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', appRoutes);


//connection
mongoose.connect('mongodb://saarrah:saarrah@ds141450.mlab.com:41450/exam-professor', function (err) {
    if (err) {
        console.log('failed connecting to the database');
    } else {
        console.log('successfully connected to the database');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

//server listening
app.listen(port, function () {
    console.log('server listening on port ' + port);
});


