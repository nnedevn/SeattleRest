//Require the stuff I need, make any global variables I need
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();

//Set and use statements to set up middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

//Controller
app.use("/articles", require("./controllers/articles.js"));

//Routes
app.get("/", function(req, res) {
  res.render("home");
});

// app.get("/articles/new", function(req, res) {
//   res.render("articles/new");
// });

//Listen on port 3000
app.listen(3000);