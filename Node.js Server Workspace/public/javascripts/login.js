//Authors: Alex Junkins, Justin Cao, Adrian Muth
//Version: 3/16/21

//retrieve category elements from document for event listners
const loginButton = document.getElementById('loginButton');

/*
This method refreshes the search criteria evertime user releases a key stroke in the searchbar. 
*/
loginButton.addEventListener('click', (e) => {

    console.log("pressed login button");

    var name = "name";
    var pass = "pass";

    //add stuff here that accepts user login
    //and sets the name and pass variables to the
    //correct values


    var loginData = { USERNAME:name, PASSWORD:pass  };

    /*
    $.post({
        traditional: true,
        url: '/login',    // url
        data: loginData,
        dataType: 'json',
        success: function(data, ) {// success callback

        }
    });
    */
    document.location = "login_placeholder.html";
});