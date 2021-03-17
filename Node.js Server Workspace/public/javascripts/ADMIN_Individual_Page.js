// Started by Daniel Co

$(document).ready(function()
{
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
});