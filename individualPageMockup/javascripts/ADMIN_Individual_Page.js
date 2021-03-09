// Started by Daniel Co

$(document).ready(function()
{
    // openForm: opens the edit main equipment photo form when edit button is clicked
    function openForm(event) {
        document.getElementById("editMainPhotoForm").style.display = "block";
    }

    // openSubForm: opens the specified form for editing sub-photos when a button is clicked
    function openSubForm1(event) {
        document.getElementById("editSubPhotoForm1").style.display = "block";
    }
    function openSubForm2(event) {
        document.getElementById("editSubPhotoForm2").style.display = "block";
    }
    function openSubForm3(event) {
        document.getElementById("editSubPhotoForm3").style.display = "block";
    }
  
    // closeForm: closes any open forms for editing equipment photos
    function closeForm(event) {
        document.getElementById("editMainPhotoForm").style.display = "none";
        document.getElementById("editSubPhotoForm1").style.display = "none";
        document.getElementById("editSubPhotoForm2").style.display = "none";
        document.getElementById("editSubPhotoForm3").style.display = "none";
    }

    // call functions when buttons are clicked
    $(".edit_main_photo_button").on("click",openForm);
    $(".edit_sub_photo_button1").on("click",openSubForm1);
    $(".edit_sub_photo_button2").on("click",openSubForm2);
    $(".edit_sub_photo_button3").on("click",openSubForm3);
    $(".close_edit_main_photo_button").on("click", closeForm);
    $(".close_edit_sub_photo_button").on("click", closeForm);
});