const express = require('express');

// CORS: cross origin resources sharing
const cors = require('cors');

const app = express();

// enable CORS (so that other web pages  can use our RESTFUl API)
app.use(cors());

// enable recieving and sending of JSON
app.use(express.json());

// using the array as an in-memory database
const recipes = [
    {
        id: 1,
        title: "Chicken Rice",
        ingredients:["chicken", "rice"],
        cuisine: "Chinese"
    },
    {
        id: 2,
        title: "Roti Prata",
        ingredients:["flour", "egg"],
        cuisine:"Indian"
    },
    {
        id: 3,
        title:"Sushi",
        ingredients:["rice", "seaweed", "fish"],
        cuisine:"Japanese"
    }

]

app.get("/", function(req,res){
    res.json({
        "message":"Success"
    })
})

// Every RESTFul endpoint consists of a HTTP method + URL fragment
// The url fragment is like a file path
// Every endpoint in a RESTFUL API refers to a resource
app.get("/recipes", function(req,res){
    res.json({
        "recipes": recipes
    })
});

// create a new recipe
// the client is expected to provide the following key
// in the json request:
// title: a string to describe the title of the recipe
// ingredients: an array of strings, with each string being one ingredient
// cuisine: a string representing the cuisine of the recipe
app.post("/recipe", function(req,res){
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const cuisine = req.body.cuisine;

    // validate the user provide the data
    if (!title || !ingredients || !cuisine) {
        res.status(400);
        res.json({
            "error":"Incomplete recipe"
        });
        // stop processing so use `return` to end the function
        return;
    }

    if (!Array.isArray(req.body.ingredients)) {
        res.status(400);
        res.json({
            "error":"Ingredients must be an array of strings"
        });
        return;
    }

    const newRecipe = {
        'id': Math.floor(Math.random() * 10000 + 1),
        'title': title,
        'ingredients': ingredients,
        'cuisine': cuisine
    }

    recipes.push(newRecipe);

    res.status(200);
    res.json({
        'message':'Recipe created successfully'
    })

})


// delete
app.delete("/recipe/:id", function(req,res){
    // find the index of the recipe that we want to delete

    // if findIndex cannot find the record we want, it will return -1
    const indexToDelete = recipes.findIndex(function(r){
        return r.id == req.params.id
    })

    if (indexToDelete == -1) {
        res.status(400);
        res.json({
            "error":"The recipe ID cannot be found"
        });
        return;
    }

    recipes.splice(indexToDelete, 1);

    res.status(200);
    res.json({"message":"Recipe has been delete"});
});

app.put("/recipe/:id", function(req,res){
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const cuisine = req.body.cuisine;

    const modifiedRecipe = {
        "title": title,
        "ingredients": ingredients,
        "cuisine": cuisine
    }

    // find the index in the recipes array to replace
    const indexToReplace = recipes.findIndex(function(r){
        return r.id == req.params.id;
    })

    recipes[indexToReplace] = modifiedRecipe;

    res.status(200);
    res.json({
        "message":"Update is successful"
    })
})

app.listen(3000, function(){
    console.log("server has started");
})