var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
  db.article.findAll({
    include: [db.author]
  }).then(function(articles) {
    res.render("articles/all", {articles: articles});
  });
});

router.post("/", function(req, res) {
  db.article.create(req.body).then(function(createdArticle) {
    res.redirect("/articles/" + createdArticle.id);
  }).catch(function(err){
    res.send("uh oh!", err);
  });
});

router.delete("/:id", function(req, res) {
  console.log("delete route. ID = ", req.params.id);
  db.article.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    console.log("deleted = ", deleted);
    res.send("success");
  }).catch(function(err) {
    console.log("an error happened", err);
    res.send("fail");
  });
});

router.get("/new", function(req, res) {
  res.render("articles/new");
});


router.get("/:id", function(req, res) {
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author]
  }).then(function(article) {
    res.render("articles/single", {article: article});
  });
});

//test data
// db.article.create({
//   title: "Crap",
//   content: "This is crap",
//   author: "Mr. Crabs"
// });

module.exports = router;