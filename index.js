// require imports a NodeJS library
const express = require('express');
// create an express application
const app = express();  

// define a route
// consists of two components
// 1. the URL fragment: what URL is associated with the route
// 2. a function: this function is executed URL on the server is executed
//     - parameter 1: request (whatever the browser sends to the server)
//     - parameter 2: response (whatever the server wants back to the browser)
app.get("/about-us", function(req,res){
    res.send("<h1>About Us</h1>");
});

app.get('/contact-us', function(req,res){
    res.send(`<form>
            <label>Your email</label>
            <input type="text" name="email"/>
        </form>`)
});

app.get('/luckynumber', function(req,res){
    const luckyNumber = Math.floor(Math.random() * 9999 + 1000);
    res.send("Your lucky number is " + luckyNumber);
})

// start server at port 3000 (the first parameter)
// and the second parameter is a callback function
// which is executed when the server starts
app.listen(3000, function(){
    console.log("Server has started");
})