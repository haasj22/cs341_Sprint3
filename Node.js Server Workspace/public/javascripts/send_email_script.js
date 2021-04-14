/**
 * @Author: William Cloutier
 * @Version: 2021
 * Bugs: None that is aware
 * This program sends the email, requires a login, a receiver, and regular email input
 */


//main function that sends the Email
//Only problem is getting all the items that are being requested
//Maybe input an array, put in a loop that prints all items and whatnot
//like 3 different vars, for item, ammount, comment, and with a loop print these
//into body with each different item
function sendEmail(b) {
  Email.send({
    Host: "smtp-mail.outlook.com",
    Username: "upemail@up.edu",
    Password: "Password",
    To: '@up.edu',//THIS IS WHO WE WANT TO SEND IT TO, FOR TEST PURPOSES, SEND IT TO YOUR UP ACCOUNT, FOR ACTUAL, SEND TO av@up.edu
    From: "upemail@up.edu",
    Subject: "Media Catalog Request: " + Date(),//Always gives a unique subject line with the date
    Body: b,

  })
    .then(function (message) {
      alert("mail sent successfully")
    });
}
