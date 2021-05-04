// File initialized by Trey Dettmer
// Additional Authors: Alex Junkins, Justin Cao, Adrian Muth
// Version: 3/22/21

$(document).ready(function()
{
    //list of all valid categories (in lower-case)
    var validCategories = ["conferencing", "streaming", 
    "recording", "presentation", "audio", "video", "computers", "deleted"];

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
        //must be in format: model/brand
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
        //must be in format: category1, category2, category3
        //valid categories: Conferencing, Streaming, Recording, Presentation, Audio, Computers
        //NOT case-sensitive, does not work for potential multi-word categories

        //split by spaces
        var catsRaw = editElem[1].innerHTML.split(", ");
        console.log(catsRaw);

        //checking for valid categories
        for (let k = 0; k < catsRaw.length; k++){
            var catInsensitive = catsRaw[k].toLowerCase().replaceAll("&nbsp;", "").replaceAll(" ", "").replaceAll("<br>", "");
            if (!checkValidCategory(catInsensitive)){
                alert("You've included an invalid category: '" + catsRaw[k] + "'\nPlease enter in this format: 'Category1, Category2, Category3'\n\nValid categories: Conferencing, Streaming, Recording, Presentation, Audio, Computers\nCategories are case insensitive.");
                return;
            }
            
        }

        var savedJsonObj = { data: []};
        for (let i = 0; i < editElem.length;i++)
        {
            savedJsonObj.data.push({"Section": $($(editElem).prev().prev()[i]).text(), "Text": editElem[i].innerHTML});
        }
        console.log(savedJsonObj);

        //variables for the SQL product table:
        //item_key:int(11)      model:varchar(20)      brand:varchar(50) 
        //picture:varchar(100)  category:varchar(50)	description:varchar(300)	
        //reservation_length:int(11)    uses:varchar(100)	(accessories:varchar(200)?)

        //picture, accessories, and reservation_length are currently hard-coded to null

        //parse the data 
        var itemKey = location.search.substring(1);
        var brandAndModel = savedJsonObj.data[0].Text.split("/");
        var cats = "";
        for(let l = 0; l < catsRaw.length; l++){
            var catParsed = capitalizeFirstLetter(catsRaw[l].toLowerCase());
            if (l != catsRaw.length - 1){
                cats = cats + catParsed + " ";
            }
            else {
                cats = cats + catParsed;
            }
        }

        console.log("brandandmodel:")
        console.log(brandAndModel)

        //send the new data to the server
        productDataNew = { 
            item_key:itemKey, 
            model_num:brandAndModel[1], 
            brand:brandAndModel[0], 
            picture:null,
            category:cats, 
            description:savedJsonObj.data[4].Text, 
            reservation_length:null, 
            uses:savedJsonObj.data[2].Text, 
            accessories:savedJsonObj.data[3].Text
        }
        
        console.log("POST REQUEST: " + JSON.stringify(productDataNew));
        $.post({
            traditional: true,
            url: '/modify',    // url
            data: productDataNew,
            dataType: 'json',
            success: function(data, ) {// success callback
                if (data != false){
                    console.log("Error: " + data);
                }
            }
        }).done(function() { alert('Text saved. Refresh page to view changes.'); })
        .fail(function(jqxhr, settings, ex) { alert('Failed to save text, ' + ex); });

        
    }

    //check if a string matches any of the valid categories
    //only compares lowercase strings.
    function checkValidCategory(category){
        for(let i = 0; i < validCategories.length; i++){
            if (category.valueOf() == validCategories[i].valueOf()){
                return true;
            }
        }
        return false;
        
    }
    
    // sourced from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    //function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // show the form asking for a url in order to change images on admin individual page
    //function to open the URL form to change images on admin individual page
    function openForm() {
        var URLForm = document.getElementById("myForm").style.display = "block";
        URLForm.classList.toggle("show");
      }
    //function to close the URL form on admin indivifula page.
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }

    $(".ADMIN imageEditIcon").on("click", openForm);
    
});
