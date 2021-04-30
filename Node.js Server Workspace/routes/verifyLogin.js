//Author: Trey Dettmer
// Checks if user is logged in to account that can access the current webpage. If not then redirects the user.



var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
const e = require('express');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var isAdmin = new Boolean(false);
var loginMatch = new Boolean(false);

//POST reciever, redirect page based on login
router.post('/', function(req, res, next) {
    
    // grabs user input as user info
    var user = {email: req.body.emailaddress, password: req.body.password, url: req.body.url};
    console.log("Verifying login username: " + user.email + " password: " + user.password + " url: " + user.url);
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

        let resObj = {"page": ""}

        // direct user to correct webpage
        if(isAdmin == true){
            isAdmin = false;
            loginMatch = false;
            
            //redirect admin to admin version of pages
            if (user.url.toLowerCase().includes("index") || user.url.toLowerCase().includes("staff_catalog")) {
                resObj.page = "ADMIN_catalog.html";
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("staff_individual_page") || user.url.toLowerCase().includes("viewer_individual_page"))
            {
                let idSubstring = user.url.split('?');
                resObj.page = "ADMIN_individual_page.html?" + idSubstring[idSubstring.length-1];
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("requests")) {
                resObj.page = "ADMIN_catalog.html";
                res.json(resObj);
            }

        } else if(loginMatch == true) {
            isAdmin = false;
            loginMatch = false;

            //redirect staff to staff version of pages
            if (user.url.toLowerCase().includes("admin_catalog") || user.url.toLowerCase().includes("index")) {

                console.log("redirecting to staff catalog");
                resObj.page = "STAFF_catalog.html";
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("admin_individual_page") || user.url.toLowerCase().includes("viewer_individual_page"))
            {
                let idSubstring = user.url.split('?');
                resObj.page = "STAFF_individual_page.html?" + idSubstring[idSubstring.length-1];
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("requests")) {
                resObj.page = "STAFF_requests_page";
                res.json(resObj);
            }
        } else {
            //redirect viewer to viewer version of pages
            if (user.url.toLowerCase().includes("admin_catalog") || user.url.toLowerCase().includes("staff_catalog")) {
                resObj.page = "index.html";
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("admin_individual_page") || user.url.toLowerCase().includes("staff_individual_page"))
            {
                let idSubstring = user.url.split('?');
                resObj.page = "VIEWER_individual_page.html?" + idSubstring[idSubstring.length-1];
                res.json(resObj);
            }
            else if (user.url.toLowerCase().includes("requests")) {
                resObj.page = "index.html";
                res.json(resObj);
            }
        }
    };
});
module.exports = router;

