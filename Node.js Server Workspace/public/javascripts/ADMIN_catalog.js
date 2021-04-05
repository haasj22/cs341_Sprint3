// File initialized by Trey Dettmer
// modified by JS Backend 3/31 - now obselete
// Because of how items are added dynamically to the HTML file, this script has no way (that JSBE knows of) to detect that
// new items have been loaded and assign them new listeners. To fix this, we've moved this code to the loadButtonListeners fn
// in ADMIN_search.js

$(document).ready(function()
{
    console.log("Hello 2");
    $(".ADMIN.deleteButton").on("click", HideItem);
    $(".undoDeletionMessage").on("click", RevealItem);

    $(".deleteButton").click(function(){
        alert("The paragraph was clicked.");
        console.log("Clicked delete button.");
    });

    document.getElementById("btn open").addEventListener("click", openForm);
    document.getElementById("btn cancel").addEventListener("click", closeForm);
    function openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
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

