// File initialized by Trey Dettmer
//Authors: Alex Junkins, Justin Cao, Adrian Muth
//Version: 3/18/21
$(document).ready(function()
{
    //retrieve category elements from document for event listners
    const loginButton = document.getElementById('loginButton');

    /*
    Transition to the login page when Login button is clicked
    */
    loginButton.addEventListener('click', (e) => {
        console.log("pressed login button");
        document.location.href= "login.html";
        
    });
});