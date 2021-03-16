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

    // changeImage: changes the main catalogue page image to the user uploaded image
    // ISSUE: "fakepath" is sent to browser rather than actual file path
    function changeMainImage(event) {
        var new_image = document.getElementById("upload_image_button_main").value;
        $(".main_image").attr('src', new_image);
    }

    function changeSubImage1(event) {
        var new_image = document.getElementById("upload_image_button1").value;
        $(".sub-img-style1").attr('src', new_image);
    }

    function changeSubImage2(event) {
        var new_image = document.getElementById("upload_image_button2").value;
        $(".sub-img-style2").attr('src', new_image);
    }

    function changeSubImage3(event) {
        var new_image = document.getElementById("upload_image_button3").value;
        $(".sub-img-style3").attr('src', new_image);
    }

    // call functions when buttons are clicked
    $(".edit_main_photo_button").on("click",openForm);
    $(".edit_sub_photo_button1").on("click",openSubForm1);
    $(".edit_sub_photo_button2").on("click",openSubForm2);
    $(".edit_sub_photo_button3").on("click",openSubForm3);
    $(".close_edit_main_photo_button").on("click", closeForm);
    $(".close_edit_sub_photo_button").on("click", closeForm);
    $(".save_photo_button").on("click", changeMainImage);
    $(".save_photo_button1").on("click", changeSubImage1);
    $(".save_photo_button2").on("click", changeSubImage2);
    $(".save_photo_button3").on("click", changeSubImage3);
});