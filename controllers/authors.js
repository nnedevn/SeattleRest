var express = require("express");
var router = express.Router();
var db = require("../models");

router.get('/', function(req, res){
  db.author.findAll().then(function(authors){
    res.render('authors/all.ejs', {authors:authors});
  })
});

router.post('/', function(req, res){
  console.log('body is ', req.body);
  db.author.create(req.body).then(function(createdAuthor){
    res.redirect('/authors/'+createdAuthor.id);
  }).catch(function(err){
    console.log('catch reached err: ', err);
    res.status(500).send('whoops...');
    //or render a missing page file
  })
})

router.get('/new', function(req, res){
res.render('authors/new.ejs');
})

router.get('/:id', function (req, res){
  db.author.findOne({
    where: { id: req.params.id},
    include: [db.article]
  }).then(function(author){
    res.render('authors/single.ejs',{author:author});
  }); 
  // console.log('single author page, id is ', req.params.id);
  // res.send('single author page');
})

module.exports = router;