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
        
        //check the fields to make sure they fit the format
        
        //check the Model/Brand field
        //check for 1 word, not multiple
        var mbWordCount = editElem[0].innerHTML.split(" ").length;
        if (mbWordCount > 1){
            alert("Invalid model and brand format!\nPlease enter in this format: 'Model'/'Brand'");
            return;
        }
        //check for '/'
        var mb = editElem[0].innerHTML.split("/")
        var mbSeparation = mb.length;
        for (let j = 0; j < mbSeparation; j++){
            if (mb[j] == ""){
                alert("The brand and/or model is empty!\nPlease enter in this format: 'Model'/'Brand'");
                return;
            }
        }
        

        //check the Categories field

        var savedJsonObj = { data: []};
        for (let i = 0; i < editElem.length;i++)
        {
            savedJsonObj.data.push({"Section": $($(editElem).prev().prev()[i]).text(), "Text": editElem[i].innerHTML});
        }
        console.log(savedJsonObj);

        //parse and send the new data to the server
        
        alert("Text saved.");
    }


});