var express = require("express");

var router = express.Router();

var User            = require("../models/user");

var passport        = require("passport");

// Root Route

router.get("/", function(req, res){
    res.render("landing");
});


//==============
//AUTH ROUTES
//==============

//show register page

router.get("/register", function(req, res) {
    res.render("register");
});


// route to handle signup logic

router.post("/register", function(req, res) {

var newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
    
});

User.register(newUser, req.body.password, function(err, user){
    if(err){
        req.flash("error", err.message);
        return res.render("register");
    }
    
    passport.authenticate("local")(req, res , function(){
        req.flash("success","Welcome to Yelpcamp " + user.username);
        res.redirect("/campgrounds");
    });
});
    
});

//Login routes

//Login form

router.get("/login", function(req, res) {
    res.render("login");
});

// Handling Login Logic

router.post("/login", passport.authenticate("local", {

    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res) {

    
});

//Logout route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","You have been logged out");
    res.redirect("/campgrounds");
});





module.exports = router;