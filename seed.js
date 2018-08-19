var Campground = require("./models/campground"),

    Comment = require("./models/comment"),
    
mongoose    = require("mongoose");



var data =[
  
    {
        name:"Lagos",
        img:"https://images.unsplash.com/reserve/J3URHssSQyqifuJVcgKu_Wald.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=589423add37e168c0601a481e74569ca&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name:"Abuja",
        img:"https://images.unsplash.com/photo-1444228250525-3d441b642d12?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ed5183c1120981ce1110f12d31c82e17&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
      {
        name:"Calabari",
        img:"https://images.unsplash.com/reserve/J3URHssSQyqifuJVcgKu_Wald.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=589423add37e168c0601a481e74569ca&auto=format&fit=crop&w=500&q=60",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
    
    ];

function seedDb(){
    //Remove Campgrounds
   Campground.remove({}, function(err){
  
    if (err){
        console.log(err);
    }
        console.log("Campgrounds Removed");
        data.forEach(function(seed){
    Campground.create(seed,function(err,campground){
        if(err){
            console.log(err);
        }else{
            console.log("Campground Added");
            //Create Campground comment
            Comment.create({
                text:"Awesome experience",
                author:"Brian"
            },function(err, comment){
                if(err){
                    console.log(err);
                }
                    else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Comment Created");
                    
                }
            }) ;
        }
    });
});


    
});

//Add Campgrounds


 
}

module.exports = seedDb;