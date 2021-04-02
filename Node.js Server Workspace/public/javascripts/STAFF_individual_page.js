// File initialized by Trey Dettmer

$(function()
{

    //allow for item to be requested
    $("#requestButton").on("click", RequestItem)

    /* Saves item's id to request array in sessionStorage */
    function RequestItem() {
        let loc = window.location.href;
        let spli = loc.split('?');
        if (sessionStorage.getItem("requested_item_ids"))
        {
            let requested_item_ids = JSON.parse(sessionStorage.getItem("requested_item_ids"));
            if (requested_item_ids.includes(spli[spli.length-1]))
            {
                alert("Item already exists in requests!")
                return;
            }
        }
        if (sessionStorage.getItem("requested_item_ids"))
        {
            let requested_item_ids = JSON.parse(sessionStorage.getItem("requested_item_ids"));
            requested_item_ids.push(spli[spli.length-1]);
            sessionStorage.setItem("requested_item_ids",JSON.stringify(requested_item_ids));
        }
        else 
        {
            let requested_item_ids = [spli[spli.length-1]];
            sessionStorage.setItem("requested_item_ids",JSON.stringify(requested_item_ids));
        }
        alert("Item added to requests!");
    }

});