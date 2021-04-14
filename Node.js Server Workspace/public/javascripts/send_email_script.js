/**
 * @Author: William Cloutier
 * @Version: 2021
 * Bugs: None that is aware
 * This program sends the email, requires a login, a receiver, and regular email input
 */
//<script src="STAFF_requests_page.js"></script>//get vars from Request Page.js
//^^ Possible way to go, get vars from request page and plug them in
/**
 * Citations
 * Citation: https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
 * Date Grabbed: 4/14/21
 * Reason: Needed a way to implement our send email script with node, instead found this script
 */

//another route is put arguments in here and then send them when we call on this in request.js
fucntion send_email_script(){

var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'mymail@outlook.com',//enter bot up user here. MUST BE UP ACCOUNT
        pass: 'myPassword'//enter bot up password
    }
});

// setup e-mail data, even with unicode symbols
// use vars to replace text and html portion
// html gives you more choice in how to make the Email
var mailOptions = {
    from: '"Media Catalog Request " <mymail@outlook.com>', // sender address (who sends)
    to: 'mymail@mail.com', // list of receivers (who receives), make av outlook email
    subject: 'Media Catalog Request: ' + Date(), // Subject line, adds date to make it unique
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);

});
}//end function
