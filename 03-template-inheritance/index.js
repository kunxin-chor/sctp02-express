const express = require('express');
const hbs = require('hbs');
const app = express();

// inform Express that we are using hbs as the view engine
app.set('view engine', 'hbs');

// setup routes
app.get('/', function(req,res){
    res.send("hello world");
})

// start server
app.listen(3000, function(){
    console.log("Server has started");
})
