//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 16 2021
//A router for the main catalog page to request a login attempt
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//POST reciever, redirect page based on login
router.post('/', function(req, res, next) {
    //in the future, any username/password
    //authentication code would go here.

    console.log("recieved login request.");
    res.redirect("ADMIN_catalog.html");
});


module.exports = router;
