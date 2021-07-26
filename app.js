
// eshint esversion : 6

require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const encrypt = require('mongoose-encryption');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/secretLoginDB', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log('database connection successfull!');
    }
});



const secretSchema = mongoose.Schema ({
    email: String,
    password: String
});

const secret = process.env.SECRET;

secretSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const Secret = new mongoose.model('secret', secretSchema);


app.listen(8080, (req, res) => {
    console.log('app.js is listening on port 8080!');
});

app.get("/", (req, res) => {
    res.render("home", {});

});

app.get("/register", (req, res) => {

    res.render("register", {});
});

app.get("/login", (req, res) => {
    res.render("login", {});
});


app.post("/register", (req, res) => {

    const secret1 = new Secret({
        email: req.body.username,
        password: req.body.password
    });

    secret1.save( (err) => {
        if(err) {
            console.log(err);
        }

        else {
            res.render("secrets", {});
        }      

    });
});

app.post("/login", (req, res) => {

    var username = req.body.username;
    var password = req.body.password;


    Secret.findOne({email: username}, function(err, foundUser) {
        if(err) {
            console.log(err);
        }

        else {
            if(foundUser.password === password) 
            {
                // console.log(foundUser.password);
                res.render("secrets", {});
            }
        }
    });
});












