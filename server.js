var app = require('./express');
var express = app.express;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');

app.use(session({
    secret: process.env.SESSION_SECRET || "Localhost Deployment",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// require("./test/app");
require("./assignment/app")(app);
require("./project/app")(app);

port = process.env.PORT || 3000;
app.listen(port);
