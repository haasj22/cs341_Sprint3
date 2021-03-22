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

    // var isStaff = new Boolean(false);
    
    console.log("recieved login request.");
    // grabs user input as user info
    user = {email: req.body.emailaddress, password: req.body.password};
    console.log(user);
    //res.redirect("ADMIN_catalog.html");

    serverfunctions.dbquery("SELECT * FROM USERS;", receiveData);
    function receiveData(error, results) {
        // // results.NAME == req.body.emailaddress && results.PASSWORD == req.body.password; 
        console.log(error);
        console.log(results);
        // for every user in dattabase, compare to var user
        results.forEach(function(element, index) {
            //converting BIT field into a boolean for comparison
            var adminValue = element.ISADMIN[0] == 1;
            console.log(element.ISADMIN[0]);
            console.log(index + "time in the loop " + adminValue);
            console.log(element.NAME + " " + element.PASSWORD + " " + adminValue );
            if (user.email == element.NAME && user.password == element.PASSWORD) {
                isAdmin = adminValue;
                loginMatch = true;
            }
            console.log("isAdmin = " + isAdmin + " loginMatch = " + loginMatch);
        });
        // direct user to correct webpage
        if(isAdmin == true){
            isAdmin = false;
            loginMatch = false;
            user.email = "email";
            user.password = "pass";
            console.log("redirecting to admin page");
            res.redirect("ADMIN_catalog.html");
        } else if(loginMatch == true) {
            isAdmin = false;
            loginMatch = false;
            user.email = "email";
            user.password = "pass";
            console.log("redirecting to staff page");
            res.redirect("STAFF_catalog.html");
        } else {
            console.log("Doesn't match a user!");
            // alert("Not a user!");
        }
    };
});
module.exports = router;

