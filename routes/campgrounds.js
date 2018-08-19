var express = require("express");

var router = express.Router();


var Campground = require("../models/campground");

var middleware = require("../middleware/index.js");

//=============
//CAMPGROUND ROUTES
//=============

//INDEX- Show all campgrounds

router.get("/campgrounds", function(req, res){
   Campground.find({}, function(err, allCampGrounds){
       if(err){
           console.log(err);
       }else{
    res.render("campgrounds/index", {campGround: allCampGrounds});

       }
   });
    
});


//CREATE- Add new campground to database

router.post("/campgrounds", middleware.isLoggedIn ,function(req, res){
    var name = req.body.name;
    var price= req.body.price;
    var img = req.body.img;
    var description = req.body.description;
    
    //To associate campground with a user
    var author = {
        id: req.user._id,
        username : req.user.username
    };
    var newCampground = {name:name, price:price, img:img, description:description, author: author};
    
    //Create a new campgrond and save to DB

    Campground.create(newCampground, function(err, newlyCreatedCamp){
        if(err){
            console.log(err);
        } else{
            req.flash("success","Campground Succesfully Created");
                res.redirect("/campgrounds");

        }
    });
    
});

//NEW- Show form to create new campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//SHOWS more info about one campground

router.get("/campgrounds/:id", function(req, res) {
    // Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
             //Render show template with that campground
    
    res.render("campgrounds/show",{showcamp:foundCampground});
        }
    });
   
});


// EDIT CAMPGROUND

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership , function(req, res) {
              
         Campground.findById(req.params.id, function(err, editCampground){

        res.render("campgrounds/edit", {editCampground : editCampground});
    });

});
//UPDATE CAMPGROUND

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.editCG, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"  + updatedCampground._id); //redirect to + req.params.id
        }
    });
    
});

//DESTROY CAMPGROUND

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
Campground.findByIdAndRemove( req.params.id, function(err){
    if(err){
        res.redirect("/campgrounds");
    }else{
         res.redirect("/campgrounds");
       
    }

    // body...
});
});


module.exports = router;