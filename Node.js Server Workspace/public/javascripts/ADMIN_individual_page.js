// File initialized by Trey Dettmer

$(document).ready(function()
{

    //Link Admin icon interactions to their respective functions
    $(".textEditIcon").on("click", SaveText);

    $(".altImageEditIconLink").change(function () {
        ChangeImage(this,$(this).prev());
    });

    $(".imageEditIconLink").change(function () {
        ChangeImage(this,$(this).prev());
    });


    /* Replaces destination image with uploaded input image */
    function ChangeImage(input,destination) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $(destination).attr('src', e.target.result)   
            }
            reader.readAsDataURL(input.files[0])
        }
        else
        {
            alert("Issue uploading image");
        }
        
    }

    /* prepares edited text to be sent to the database */
    function SaveText() {

        var editElem = document.getElementsByClassName("infoText");
        var savedJsonObj = { data: []};
        for (let i = 0; i < editElem.length;i++)
        {

            savedJsonObj.data.push({"Section": $($(editElem).prev().prev()[i]).text(), "Text": editElem[i].innerHTML});

        }
        //console.log(savedJsonObj);
        alert("Text saved.");
    }


});

