//Author: Alex Junkins, Adrian Muth, Reggie Nillo and Justin Cao
//Version: April 15 2021
//A router for the staff request page to send requests as an email
var express = require('express');
var router = express.Router();
var emailScript = require('./sendEmailScript.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thisisatestforsprint4@gmail.com',
        pass: 'sprintFOUR4!'
    }
});

var mailOptions = {
    from: 'thisisatestforsprint4@gmail.com',
    to: 'thisisatestforsprint4@gmail.com',
    subject: 'Who wrote this awful code',
    text: ""
};


function sendEmailViaServer(b){
    
    console.log("Using the Node.js server to send an email with body: " + b);
    mailOptions.text = b;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

//POST reciever, turning the received ids into strings
router.post('/', function(req, res, next) {
    console.log("Received email order request.");

    sendEmailViaServer("Hi, mom!");
    
});

module.exports = router;