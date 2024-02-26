const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

// create a new Express application
const app = express();

// inform Express that we are using hbs as the view engine
app.set('view engine', 'hbs');

waxOn.on(hbs.handlebars);  // apply wax-on to handlebars
waxOn.setLayoutPath('./views/layouts'); // where to find the layout

// custom helpers (make sure it's before the routes after the requires)
// first parameter: the name of the helper
// second parameter: function which is called when we use the helper
//
hbs.handlebars.registerHelper("ifEquals", 
    function(arg1, arg2, options){
        if (arg1 == arg2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
})

// setup routes
app.get('/', function(req,res){
    res.render('index');
})

app.get('/about-us', function(req,res){
    res.render('about');
})

app.get('/contact-us', function(req,res){
    res.render('contact');
})

app.get('/fruits', function(req,res){
    const fruits = ["apples", "oranges", "bananas"];
    const favorite = "oranges"
    res.render('fruits',{
        "fruits": fruits,
        "favorite": favorite,
        "isRaining": false
    })
})

// start server
app.listen(3000, function(){
    console.log("Server has started");
})
