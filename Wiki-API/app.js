const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{ useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model("Article",articleSchema);

app.route("/articles")
    .get(function (req,res){
        Article.find(function (err,articles){
            if(!err)    res.send(articles);
            else    res.send(err);
            
        })
    })

    .post( function (req, res) {

        const article = new Article({
            title:req.body.title,
            content:req.body.content
        })
        article.save(function (err){
            if(!err)  res.send("Post successful !!");
            else  res.send(err);
        });
    
    })

    .delete( function(req, res) {
        Article.deleteMany(function (err){
            if(!err)  res.send("delete successful !!");
            else  res.send(err);
    })
    });


app.route("/articles/:articleTitle")
    .get(function (req,res){
        Article.findOne({title:  req.params.articleTitle}, function (err,article){
            if(!err)    res.send(article);
            else    res.send(err);
            
        })
    })
    .put(function (req,res){
        Article.updateOne(
            {title:  req.params.articleTitle},
            {title:req.body.title, content:req.body.content},
            function (err){
            if(!err)    res.send("Put sucessful!!");
            else    res.send(err);
            
        })
    })
    .patch(function (req,res){
        Article.updateOne(
            {title:  req.params.articleTitle},
            {$set: req.body},
            function (err){
            if(!err)    res.send("Patch sucessful!!");
            else    res.send(err);
            
        })
    })
    .delete(function (req,res){
        Article.deleteOne({title:  req.params.articleTitle}, function (err){
            if(!err)    res.send("delete sucessful!!");
            else    res.send(err);
            
        })
    });


app.listen(3000,function (req,res){
    console.log("Server is running at port 3000");
})