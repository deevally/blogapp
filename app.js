var express     = require("express"),

     app        = express(),

mongoose        = require("mongoose"),
     
passport        = require("passport"),

methodOverride  = require("method-override"),

localStrategy   = require("passport-local"),

bodyParser      = require("body-parser"),

flash           = require("connect-flash"),

Campground      = require("./models/campground"),

Comment         = require("./models/comment"),

User            = require("./models/user"),


seedDb          = require("./seed");

//seedDb();  seed the database

//Requiring Routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes      = require("./routes/auth");

//mongoose.connect("mongodb://localhost/yelpdb_v12");
var url = process.env.DATABASEURL || "mongodb://localhost/yelpdb_v12" ;
mongoose.connect(url);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATIONS

app.use(require("express-session")({
    secret: "Rover",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Personal Middleware to show if user is logged in 
//currentUser is available on all Platforms with this middleware.
//error and success  is available on all Platforms with this middleware.

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    next();
});

// USE COMMENT, CAMPGROUND & AUTH  ROUTES

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);










app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Yelp Camp Server has started");
});

