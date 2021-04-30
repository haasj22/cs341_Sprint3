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


var isAdmin = new Boolean(false);
var loginMatch = new Boolean(false);
var user = {email: "email", password: "pass"};

//POST reciever, redirect page based on login
router.post('/', function(req, res, next) {
    //in the future, any username/password
    //authentication code would go here.

    
    console.log("recieved login request.");
    // grabs user input as user info
    user = {email: req.body.emailaddress, password: req.body.password};
    console.log("Provided user username: " + user.email + " password: " + user.password);
    serverfunctions.dbquery("SELECT * FROM USERS;", receiveData);
    function receiveData(error, results) {

        // for every user in dattabase, compare to var user
        results.forEach(function(element, index) {
            //converting BIT field into a boolean for comparison
            var adminValue = element.ISADMIN[0] == 1;

            if (user.email == element.NAME && user.password == element.PASSWORD) {
                isAdmin = adminValue;
                loginMatch = true;
            }
        });
        // direct user to correct webpage
        if(isAdmin == true){
            isAdmin = false;
            loginMatch = false;
            let resObj = {"success": true, "redirect": "ADMIN_catalog.html", "username": user.email, "password": user.password, "error": ""};
            console.log("redirecting to admin page");
            res.json(resObj);
        } else if(loginMatch == true) {
            isAdmin = false;
            loginMatch = false;
            let resObj = {"success": true, "redirect": "STAFF_catalog.html", "username": user.email, "password": user.password, "error": ""};
            console.log("redirecting to staff page");
            res.json(resObj);
        } else {
            let resObj = {"success": false, "redirect": "login.html", "username": "", "password": "", "error": "Incorrect username or password"};
            console.log("not a recognized admin or staff");
            res.json(resObj);
        }
    };
});
module.exports = router;

