// File initialized by Trey Dettmer

$(document).ready(function()
{
    //whether user is admin
    var isAdmin = false;

    InitializePage();
    
    /* Called when page is loaded */
    function InitializePage()
    {
        

        if (!isAdmin)
        {
            //remove all admin elements
            var adminElements = document.getElementsByClassName("ADMIN")
            while (adminElements[0])
            {
                adminElements[0].parentNode.removeChild(adminElements[0]);
            }

            //don't allow text to be edited
            $(".infoText").attr("contenteditable","false");

            //allow for item to be requested
            $("#requestButton").on("click", RequestItem)

        }
        else
        {
            //Link Admin icon interactions to their respective functions
            $(".textEditIcon").on("click", SaveText);

            $(".altImageEditIconLink").change(function () {
                ChangeImage(this,$(this).prev());
            });

            $(".imageEditIconLink").change(function () {
                ChangeImage(this,$(this).prev());
            });

            

        }
    }

    /* Replaces destination image with uploaded input image */
    function ChangeImage(input,destination) {
        if (!isAdmin){return;}

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
        if (!isAdmin){return;}

        var editElem = document.getElementsByClassName("infoText");
        var savedJsonObj = { data: []};
        for (let i = 0; i < editElem.length;i++)
        {

            savedJsonObj.data.push({"Section": $($(editElem).prev().prev()[i]).text(), "Text": editElem[i].innerHTML});

        }
        //console.log(savedJsonObj);
        alert("Text saved.");
    }


    /* Requests the item */
    function RequestItem() {
        if (isAdmin){return;}
        //TODO: Actually send request
        alert("Item requested.");
    }

});

