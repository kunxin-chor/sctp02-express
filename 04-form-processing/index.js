const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const app = express();

// setup hbs as the view engine
app.set("view engine", "hbs");

// enable wax on
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable static files
app.use(express.static('public'));

// enable form processing (i.e read data from forms)
app.use(express.urlencoded({
    'extended': false // advanced features, usually false to save processing power
}))

// When we are doing forms, GET routes
// are to display the form
app.get("/survey", function (req, res) {
    res.render("survey");
})

// POST routes are for reciving data from the browser
// for the purpose of processing or saving
app.post('/survey', function (req, res) {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName
    const gender = req.body.gender;
    // by default assume the user never selects any hobbies
    let hobbies = [];
    if (req.body.hobbies) {
        // Array.isArray() returns true if given parameter is an array
        if (Array.isArray(req.body.hobbies)) {
            // if req.body.hobbies is an array, then we just
            // store it in the `hobbies` variable
            hobbies = req.body.hobbies;
        } else {
            // if req.body.hobbies is one string
            // hobbies array will only contain that one string
            // hobbies.push(req.body.hobbies);
            hobbies = [ req.body.hobbies ]
        }
    }
    console.log('hobbies = ', hobbies);

    res.render('summary', {
        "firstName": firstName,
        "lastName": lastName,
        "gender" : gender,
        "hobbies": hobbies,
        "country": req.body.country

    })
})

app.listen(3000, function () {
    console.log("Server has started");
})