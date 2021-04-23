//Author: Alex Junkins, Adrian Muth, Reggie Nillo and Justin Cao
//Version: April 15 2021
//A router for the staff request page to send requests as an email
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//POST reciever, turning the received ids into strings
router.post('/', function(req, res, next) {
    console.log("Received email order request.");

    
});

module.exports = router;