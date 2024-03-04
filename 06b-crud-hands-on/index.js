// 1. SETUP
// require is also known as 'importing'
// require is from something known as 'commonjs'
const express = require('express');
const hbs = require('hbs');

// create an express application
const app = express();

// enable form processing for Express
app.use(express.urlencoded({
    extended: false
}));

// setup hbs
app.set('view engine', 'hbs');

// mock database using an array
const database = [
    {
        "id": 1, // the id is to differenate each record from each other
        "title": "Preloved PS5",
        "price":800.99,
        "payments":["cod", "paynow"],
        "type":"entertainment"
    },
    {
        "id": 2, 
        "title":"Second Hand Jeans",
        "price": 45.5,
        "payments":["cheque"],
        "type":"clothings"
    },
    {
        "id": 3,
        "title": "Used Dictionary",
        "price": 13.5,
        "payments":["cod"],
        "type":"others"
    }
]

// 2. ROUTES
// HTTP method: 
// GET: retriving information from the server
// POST: adding new data to server
// PUT: replacing existing data on the server 
// PATCH: modifying existing data on the server
// DELETE: deleting existing data on the server
// req: client (the one sending) to server
// res: server to client 
app.get('/', function(req,res){
    // 'render' and send back the content
    // of index.hbs as content
    // the filepath is relative to the `views` folder
    res.render("index", {
        'products': database
    });
});

app.get('/create-listing', function(req,res){
    res.render('create-listing');
})

app.post("/create-listing", function(req,res){
    console.log(req.body);
    const title = req.body.title;
    const price = req.body.price;
    let payments = [];
    if (Array.isArray(req.body.payments)){
        payments = req.body.payments;
    } else if (req.body.payments) {
        // if req.body.payments is NOT an array
        // but is truthy then it has to be a string
        payments = [ req.body.payments ];
    }
    const type = req.body.type;
    const newProduct = {
        "id": Math.floor(Math.random() * 10000 + 1),
        "title": title,
        "price": price,
        "payments": payments,
        "type": type
    }
    database.push(newProduct);
    // instruct the client (i.e browser) to go 
    // to a new URL
    res.redirect("/");

})

// A route to display a form to confirm the deletion
// We will use a route parameter to specify which ID to delete
app.get('/delete-listing/:listingid', function(req,res){
    // 1. get the ID that the user wants to delete
    const idToDelete = req.params.listingid;

    // 2. retrieve the listing object based on its ID
    // let listingToDelete = database.find(function(record){
    //     return record.id == idToDelete;
    // })
    let listingToDelete = null;
    for (let record of database) {
        if (record.id == idToDelete) {
            listingToDelete = record;
            break;
        }
    }

    // 3. show a form to ask the user if they are really
    // sure they want to delete
    res.render('confirm-delete', {
        "record": listingToDelete
    }) 
})

// route to confirm the submission of the form
app.post('/delete-listing/:listingid', function(req,res){
    // 1. get the ID of the listing that we want to delete
    const idToDelete = req.params.listingid;

    // 2. get the INDEX of the listing that we want to delete
    // (to delete an item from an array using the splice function,
    // we need the index)

    // const indexToDelete = database.findIndex(function(record){
    //     return record.id == idToDelete;
    // })

    let indexToDelete = -1;
    for (let i = 0; i < database.length; i++) {
        if (database[i].id == idToDelete) {
            indexToDelete = i;
            break;
        }
    }

    // 3. remove the item from the array
    database.splice(indexToDelete, 1);

    res.redirect('/');
})

// 3. START SERVER
app.listen(3000, function(){
    console.log("server has started");
})
