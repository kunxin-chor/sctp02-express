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

// In-memory database
const foodRecords = [
    {
        id: 1,
        foodName: "Chicken Rice",
        calories: 500,
        meal:"lunch",
        tags:["organic", "less-oil"]
    },
    {
        id: 2,
        foodName:"Boston Clam Chowder",
        calories: 750,
        meal:"dinner",
        tags:["home-cooked"]
    },
    {
        id: 3,
        foodName:"Tuna Sandwich",
        calories: 600,
        meal:"snack",
        tags:["gluten-free"]
    }
];

// 2. ROUTES
app.get('/', function(req,res){
    res.render('index', {
        foodRecords: foodRecords
    })
})

// 3. START SERVER
app.listen(3000, function(){
    console.log("Server has started")
})