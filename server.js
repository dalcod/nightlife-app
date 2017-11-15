var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var passport = require("passport");

var routes = require("./routes");
var strategy = require("./setuppassport");

var app = express();

var mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);
mongoose.connection.on("error", console.error.bind(console, "Unable to connect to MongoDB."));

passport.use(strategy);
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/dist")));
app.use(routes);

app.listen(process.env.PORT || 3000, function(){
    console.log("Successfully connected on port: 3000");
});