// Started by Daniel Co

$(document).ready(function()
{
    // openForm: opens the edit equipment photo form when edit button is clicked
    function openForm(event) {
        document.getElementById("editMainPhotoForm").style.display = "block";
    }
  
    // closeForm: closes the edit equipment photo form when close button is clicked
    function closeForm(event) {
        document.getElementById("editMainPhotoForm").style.display = "none";
    }

    // call functions when buttons are clicked

    $(".edit_main_photo_button").on("click",openForm);
    $(".close_edit_main_photo_button").on("click", closeForm);
});