// File initialized by Trey Dettmer

$(document).ready(function()
{
    $(".deleteButton").on("click",HideItem);
    $(".undoDeletionMessage").on("click",RevealItem)

    //called when "x" deletion button is clicked
    function HideItem(event)
    {
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