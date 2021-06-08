
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const ejs = require('ejs');
// const md5 = require('md5');
// const encrypt = require('mongoose-encryption');
// const bcrypt = require('bcrypt');
// const saltRounds = 15;
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://localhost:27017/userDB",{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    googleId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt,{secret: process.env.SECRET ,encryptedFields: ["password"] });

const User = mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  

passport.use(new googleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', function (req, res){
  res.render('home')
});

app.get('/auth/google', 
    passport.authenticate("google", { scope: ['profile'] }));

app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/secrets');
  });

app.get('/login', function (req, res){
  res.render('login')
});

app.get('/register', function (req, res){
  res.render('register')
});

app.get("/secrets",function (req,res){
    if(req.isAuthenticated()) res.render("secrets");
    else res.redirect("/login");
    
})

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect("/");
})


app.post("/register",function (req,res){
     // bcrypt encryption with salting 
    /* bcrypt.hash(req.body.password,saltRounds, function (err,hash){
        if(err) console.log(err);
        else {
            const newUser = new User({
                email: req.body.username,
                password:  hash
            });
            newUser.save(function (err){
                if (err) {
                    console.log(err);
                    
                } else {
                    res.render("secrets")
                }
            })
        }
    }) */
     User.register({username: req.body.username}, req.body.password, function (err,user){
         if (err) {
             console.log(err);
         } else {
             passport.authenticate("local")(req,res, function(){
                 res.redirect("/secrets");
             })
         }
     })
  
    
})

app.post("/login",function (req,res){
      // bcrypt encryption with salting 

    /*const unsername = req.body.username;
    const password = req.body.password;
    User.findOne({email: unsername},function (err,user){
        if (err)    console.log(err);
        else  if( user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result === true) res.render("secrets");
            })
            
        }  
    })*/

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, function (err){
        if(err) console.log(err);
        else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }
    })

})

app.listen(3000,function (req,res){
    console.log("Server is running at port 3000");
});