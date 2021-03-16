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
    function changeMainImage(input) {
    // Resource: https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded/4459419#4459419
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('main_image_source').src = e.target.result;
            }
            reader.readAsDataURL(input.files[0])
          }
          else
          {
            alert("Issue uploading image");
          }
        }
        $("#edit_main_photo_button").change(function() {
        changeMainImage(this)
    });

    // changeSubImage1: changes the 1st sub image to the user uploaded image
    function changeSubImage1(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('sub_image_source1').src = e.target.result;
            }
            reader.readAsDataURL(input.files[0])
          }
          else
          {
            alert("Issue uploading image");
          }
        }
        $("#edit_sub_photo_button1").change(function() {
        changeSubImage1(this)
    });

    // changeSubImage2: changes the 2nd sub image to the user uploaded image
    function changeSubImage2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('sub_image_source2').src = e.target.result;
            }
            reader.readAsDataURL(input.files[0])
          }
          else
          {
            alert("Issue uploading image");
          }
        }
        $("#edit_sub_photo_button2").change(function() {
        changeSubImage2(this)
    });

    // changeSubImage3: changes the 3rd sub image to the user uploaded image
    function changeSubImage3(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('sub_image_source3').src = e.target.result;
            }
            reader.readAsDataURL(input.files[0])
          }
          else
          {
            alert("Issue uploading image");
          }
        }
        $("#edit_sub_photo_button3").change(function() {
        changeSubImage3(this)
    });

    // call functions when buttons are clicked
    $(".edit_main_photo_button").on("click",openForm);
    $(".edit_sub_photo_button1").on("click",openSubForm1);
    $(".edit_sub_photo_button2").on("click",openSubForm2);
    $(".edit_sub_photo_button3").on("click",openSubForm3);
    $(".close_edit_main_photo_button").on("click", closeForm);
    $(".close_edit_sub_photo_button").on("click", closeForm);
});