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
    
    console.log("recieved individual page request.");
    res.render('VIEWER_individual_page', { title: 'Express' });
    
});


module.exports = router;
