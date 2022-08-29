'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

// connect express server to mongodb server
mongoose.connect(`${process.env.MONGODB_URL}`,
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings


// to create collections in our DB 
// we will be creating schemas and models
//  create collections
// schemas (determines how the shape of our data will look like) blueprint or a template for our Collection 
// schemas are basically our data models
// so now we have cats DB and we'll be adding data to it by following the schema structure
// Schema is a class in mongoose package
// Schema Data Types >>> object-array-number-boolean-string-null

const catSchema = new mongoose.Schema({
    ownerName: String,
    catName: String,
    breed: String
})

// build a model from our schema
// schema: drawing phase
// model: creation phase
// A Mongoose model is a wrapper on the Mongoose schema.
// A Mongoose schema defines the structure of the document, default values, validators, etc.,
// whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, et
const catModel = mongoose.model('kitten', catSchema)


// Step (four) populate your DB
// the moment we are populating or seeding our database
function seedCatCollection() {
    // you'll create an object that follows the Model structure
    const sherry = new catModel({
        ownerName: 'razan',
        catName: 'sherry',
        breed: 'angora'
    })
    const sandy = new catModel({
        ownerName: 'razan',
        catName: 'sandy',
        breed: 'persian'
    })
    const awad = new catModel({
        ownerName: 'mohammad',
        catName: 'awad',
        breed: 'baldi'
    })
    sherry.save();
    sandy.save();
    awad.save();
}

seedCatCollection();

// Introduce mongo compass


// proof of life
app.get('/', homePageHandler);
app.get('/cat',getCatsHandler);


function homePageHandler(req, res) {
    res.send('you are doing great')
}


// /////////// 6
// now I want to start communicating with mongo
// go to terminal >> mongo >> 
// mongo shell has so many commands
// open cheatsheet
// run show dbs >> shows all the databases
// run use cats >> to create a cats database 
// run show dbs again >> your cats db will not be there bcz mongo will create it when you add collection of data to it
// go to the mongoose documentation from her and follow the steps
// https://mongoosejs.com/docs/index.html
// npm install mongoose

// http://localhost:3001/cat?ownerName=razan
function getCatsHandler(req,res) {
    let ownerName2 = req.query.ownerName;
    // let {name} = req.query
    catModel.find({ownerName:ownerName2},function(err,ownerData){
        if(err) {
            console.log('did not work')
        } else {
            console.log(ownerData)
            res.send(ownerData);
        }
    })
}

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})