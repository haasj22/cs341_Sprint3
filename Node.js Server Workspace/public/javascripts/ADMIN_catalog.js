// File initialized by Trey Dettmer
// modified by JS Backend 3/29
// not currently functional

$(document).ready(function()
{
    console.log("Hello");
    $(".ADMIN deleteButton").on("click",HideItem);
    $(".undoDeletionMessage").on("click",RevealItem)

    //called when "x" deletion button is clicked
    function HideItem(event)
    {
        console.log("Trying to delete item.");
        $(this).prev().css("visibility","visible");

        $(this).prev().css("cursor","default");
    }

    // called when "undo?" is clicked
    function RevealItem(event)
    {
        $(this).parent().css("visibility","hidden");
    
        $(this).parent().css("cursor","pointer");
    }
});