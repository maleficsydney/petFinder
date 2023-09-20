// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html');

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// -------------------------------------------------->

// get all pets from the database
/* 
* Get the desired url from our data object as a route.
* Access the pets array variable and return it as an object.
*/

app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.status(201).send(pets);

});

// -------------------------------------------------->

// get pet by owner with query string
/* 
* 
* 
*/

app.get('/api/v1/pets/owner/:name', (req, res) => {
    // get the owner from the request
    const owner = req.params.name

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    if (pet) {
        res.send(pet);
} else {
    res.status(404).send('Pet Not Found');
}});

// -------------------------------------------------->

// get pet by name
/* 
* Declare a variable, name, containing the required parameter of name.
* Find the pet within the pet array object with the keyword.
* If the pet is an object in the array, display it upon the page 
* as a response. If not, display a 404 Error.
*/

app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;


    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    if (pet) {
        res.send(pet);
    } else {
        res.status(404).send(`Pet not found.`);
    }
    
});

// -------------------------------------------------->

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;