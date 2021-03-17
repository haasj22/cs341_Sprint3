// File initialized by Trey Dettmer

$(document).ready(function()
{
    var isAdmin = false;
    InitializePage();
    
    $(".deleteButton").on("click",HideItem);
    $(".undoDeletionMessage").on("click",RevealItem)


    function InitializePage()
    {
        var adminElements = document.getElementsByClassName("ADMIN");

        if (!isAdmin)
        {
            //remove all admin elements
            while (adminElements[0])
            {
                adminElements[0].parentNode.removeChild(adminElements[0]);
            }
    
            //change login status
            document.getElementsByClassName("navBarLinks")[0].innerHTML = "Log In";
        }
        else
        {
            //change login status
            document.getElementsByClassName("navBarLinks")[0].innerHTML = "Admin";
        }
    }

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