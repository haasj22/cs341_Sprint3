// File initialized by Trey Dettmer

$(document).ready(function()
{
    //retrieve category elements from document for event listners
    const requestButton = document.getElementById('request');

    /*
    Transition to the login page when Login button is clicked
    */
    requestButton.addEventListener('click', (e) => {
        console.log("pressed request button");
        sendEmail();
    });

    function sendEmail() { 
        Email.send({ 
          Host: "smtp.gmail.com", 
          Username: "hanshaas4321@gmail.com", 
          Password: "password", 
          To: 'hanshaas4321@gmail.com',
          From: "hanshaas4321@gmail.com", 
          Subject: "Camera checked out", 
          Body: "(1) JVC Camera has been requested by Staff Member 'x' ", 
        }) 
          .then(function (message) { 
            alert("mail sent successfully") 
          }); 
      } 
});