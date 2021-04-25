// File initiated by Trey Dettmer
// This file handles sending the post request to server when user attempts to login
$(function()
{
    $("#button").on('click', SendPostRequest);

    function SendPostRequest(e)
    {
        let username = document.getElementById("emailaddress").value;
        let password = document.getElementById("password").value

        let obj = {"emailaddress": username, "password": password};
        console.log("sending");
        $.post('/login',obj,function(data,status){
            HandleServerResponse(data,status);
        });
        
    }

    function HandleServerResponse(data,status)
    {
        console.log("TESTING");
        if (status == "error")
        {
            console.log("Error sending post request");
            //refresh page
            location.reload();
            return;
        }
        if (data.success)
        {

            // read data
            let newURL = "mediacatalog.campus.up.edu:3000/" + data.redirect;
            let username = data.username;
            let password = data.password;
            
            // save username and password to session storage
            sessionStorage.setItem("username",username);
            sessionStorage.setItem("password",password);

            // load new page
            window.location = newURL;
            
        }
        else 
        {
            // display error message
            let error = data.error;
            alert("" + error);
        }
    }

});