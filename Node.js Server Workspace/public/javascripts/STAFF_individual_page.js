// File initialized by Trey Dettmer

$(function()
{

    //allow for item to be requested
    $("#requestButton").on("click", RequestItem)

    /* Saves item's id to request array in sessionStorage */
    function RequestItem() {
        //get url (item id is at end of url after ?)
        let loc = window.location.href;
        let spli = loc.split('?');

        //Adding an item to the request array
        if (sessionStorage.getItem("requested_item_ids"))
        {
            //Check whether or not the current item is in the request array
            let requested_item_ids = JSON.parse(sessionStorage.getItem("requested_item_ids"));
            if (requested_item_ids.includes(spli[spli.length-1]))
            {
                alert("Item already exists in requests!")
                return;
            }
            //Adds the current item's id to the session storage's request array
            requested_item_ids.push(spli[spli.length-1]);
            sessionStorage.setItem("requested_item_ids",JSON.stringify(requested_item_ids));
        }
        else{ 
            //Add the current item's id as the first requested item to session storage's request array 
            let requested_item_ids = [spli[spli.length-1]];
            sessionStorage.setItem("requested_item_ids",JSON.stringify(requested_item_ids));
        }
        alert("Item added to requests!");
    }

});