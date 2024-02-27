// 1. SETUP
const express = require('express'); 
const hbs = require('hbs');
const wax = require('wax-on');

const app = express(); // create an express application
app.set('view engine', 'hbs'); // set express to use hbs as our view engine

// setup wax on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable form processing
app.use(express.urlencoded({
    extended: false
}))

// 2. ROUTES
app.get('/', function(req,res){
    res.render('index')
})

app.get('/booking', function(req,res){
 
    res.render('booking')
})

app.post('/booking', function(req,res){
    res.send("Form recieved");

    let addOns = [];
    if (req.body.addOns) {
        if (Array.isArray(req.body.addOns)) {
            addOns = req.body.addOns;
        } else {
            addOns = [ req.body.addOns];
        }
    }
    console.log("selected addons =", addOns);

    // req is whatever the client sends to the server
    // and the form data will be in req.body
    console.log(req.body);
})

// 3. START SERVER
app.listen(3000, function(){
    console.log("Server has started")
})