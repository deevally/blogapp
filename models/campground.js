var mongoose    = require("mongoose");


//SET SCHEMA

var CampgroundSchema = new mongoose.Schema({
    name:String,
    price: String,
    img: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    },
    comments :[
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:"Comment"
           
        }
        
        ]
});

var Campground = mongoose.model("Campground",CampgroundSchema );

module.exports = Campground;
