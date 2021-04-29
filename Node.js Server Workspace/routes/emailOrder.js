//Author: Alex Junkins, Adrian Muth, Reggie Nillo and Justin Cao
//Version: April 27 2021
//A router for the staff request page to send requests as an email
var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//email function retrieved from this tutorial:
//https://www.w3schools.com/nodejs/nodejs_email.asp

//import email module
var nodemailer = require('nodemailer');
const { json } = require('body-parser');

//success variable
var success;

//create email variables
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'UP.AVS.Item.Request.Bot@gmail.com',
        pass: 'Goodbye-Software-Engineering'
    }
});

var mailOptions = {
    from: 'UP.AVS.Item.Request.Bot@gmail.com',
    to: 'av@up.edu, UP.AVS.Item.Request.Bot@gmail.com', //to be sent to the official account, as well as recorded by the email bot.
    subject: '',
    text: '',
};


//a function to send an email to the designated address 
function sendEmailViaServer(body, requestee){
    
    console.log("Using the Node.js server to send an email with body: " + body + " from user " + requestee);
    mailOptions.subject = "UP Equipment Rental Website request from " + requestee;
    mailOptions.text = body;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          success = false;
        } else {
          console.log('Email sent: ' + info.response);
          success = true;
        }
    });
}

//POST reciever, turning the received ids into strings
router.post('/', function(req, res, next) {
    console.log("Received email order request.");

    //assuming these are in a json object in this format:
    /* var jsonObj = {
        requestee: string, (null w/o sign-on feature)
        itemArray: [
            item1 = "key1*itemName1*quant1*comment1",
            item2 = "key2*itemName2*quant1*comment2",
            ...
        ]
    }; */

    //retrieve data variables
    var jsonObj = req.body;
    var requestee = req.body.requestee;
    console.log("Requestee: " + requestee)
    var itemsDataArray = req.body.itemArray;
    console.log("Item Array: " + itemsDataArray)

    //construct intial string line
    var emailString = "User '" + requestee + "' has requested items from the University of Portland Equipment Rental Request Website:\n\n";

    //convert data variables into email script lines
    var emailStringLines = [itemsDataArray.length];
    for (var i = 0; i < itemsDataArray.length; i++) {
        console.log("Item " + (i+1));
        splitString = itemsDataArray[i].split("*");
        key = splitString[0];
        console.log("\tKey: " + key);
        itemName = splitString[1];
        console.log("\tName: " + itemName);
        quant = splitString[2];
        console.log("\tQuantity: " + quant);
        comment = splitString[3];
        console.log("\tComment: " + comment);
        emailStringLine = "Item '" + itemName + "' with ID key number '" + key+ "'. Quantity: " + quant + ".\nComment: '" + comment + "'\n\n";
        emailStringLines[i] = emailStringLine;
    }

    //combine data script lines with opening lines and append closing line
    for (var j = 0; j < emailStringLines.length; j++){
        emailString = emailString + emailStringLines[j];
    }
    emailString = emailString + "\nNote: Logged-in user currently cannot be read. We're working to fix this. Thank you for your patience.\nSent automatically by the rental site. Please do not respond to this email."

    console.log("\nFinal email string:\n-");
    console.log(emailString);
    console.log("-");

    //send email
    sendEmailViaServer(emailString, requestee);

    //report success value
    res.send(success);
});

module.exports = router;