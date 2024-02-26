const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

// create a new Express application
const app = express();

// inform Express that we are using hbs as the view engine
app.set('view engine', 'hbs');

waxOn.on(hbs.handlebars);  // apply wax-on to handlebars
waxOn.setLayoutPath('./views/layouts'); // where to find the layout

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

// start server
app.listen(3000, function(){
    console.log("Server has started");
})
