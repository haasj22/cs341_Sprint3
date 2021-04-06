$(document).ready(function()
{
    //Author Aidan Day Sprint 2 CS 341
    //Structure of search was taken from James Q Quick's JS Search Bar Tutorial
    //https://www.youtube.com/watch?v=wxz5vJ1BWrc
    //Version: March 21, 2021



    //retrieve catalog element to be populated.
    const itemCatalog = document.getElementById('bottomCatalogItems');

    //retrieve category elements from document for event listners
    const viewAll = document.getElementById('allSort');
    const conferencing = document.getElementById('conferencingSort');
    const streaming = document.getElementById('streamingSort');
    const recording = document.getElementById('recordingSort');
    const presentation = document.getElementById('presentationSort');
    const audio = document.getElementById('audioSort');
    const computer = document.getElementById('computerSort');
    const video = document.getElementById('videoSort');
    const deleted = document.getElementById('deletedSort');

    //retrieve returnCount <p> div to update with every item display
    const resultCount = document.getElementById('resultCount');

    //retrive searchbar to extract search criteria
    const searchBar = document.getElementById('searchBar');
    var placeholderImage = "https://www.universitycounselingjobs.com/institution/logo/logo2(4).png";
    let CatalogItemsFull = [];
    let CatalogItems = [];

    //variable for initializing the page
    let init = true;

    /*
    This method refreshes the search criteria evertime user releases a key stroke in the searchbar. 
    */
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        displayItemsByNameAndCategory(searchString);
    });

    //Display all categories when viewAll button is clicked
    viewAll.addEventListener('click', (e) => {
        //return all values to CatalogItems array
        loadItems();

        //send items to be displayed
        resultCount.innerHTML = CatalogItems.length + " results";
        displayItems(CatalogItems);
    });

    //categorical search for conferencing items
    conferencing.addEventListener('click', (e) => {
        const searchString = "conferencing";
        displayItemsByCategory(searchString);
    });

    //categorical search for streaming items
    streaming.addEventListener('click', (e) => {
        const searchString = "streaming";
        displayItemsByCategory(searchString);
    });

    //categorical search for recording items
    recording.addEventListener('click', (e) => {
        const searchString = "recording";
        displayItemsByCategory(searchString);
    });

    //categorical search for presentation items
    presentation.addEventListener('click', (e) => {
        const searchString = "presentation";
        displayItemsByCategory(searchString);
    });

    //categorical search for audio items
    audio.addEventListener('click', (e) => {
        const searchString = "audio";
        displayItemsByCategory(searchString);
    });

    //categorical search for computer items
    computer.addEventListener('click', (e) => {
        const searchString = "computer";
        displayItemsByCategory(searchString);
    });

    //categorical search for video items
    video.addEventListener('click', (e) => {
        const searchString = "video";
        displayItemsByCategory(searchString);
    });

    //categorical search for deleted items
    deleted.addEventListener('click', (e) => {
        const searchString = "deleted";
        displayItemsByCategory(searchString);
    });

    /*
    displayItems takes an array of items and converts each item into a HTML block. Each of these blocks is appended together and incerted into bottomCategory div of mainCatelog 
    */
    const displayItems = (items) => {
        items.forEach(addFillersToEmptyImages);
        const htmlString = items
            .map((item) => {
                if (item.category.toLowerCase().includes("deleted")){
                    //add ' (deleted)' to the end of item.name
                    if(!item.name.includes("deleted")){
                        item.name = item.name + " (deleted)";
                    }
                }
                return `             
                        <figure class="bottomIndividualItem">
                            <div class="deletionOverlay">
                            <p class="deletionMessage">Do you want to delete this item?</p>
                            <a class="confirmDeletionMessage" key="${item.itemKey}" category="${item.category}">Delete</a> 
                            <a class="undoDeletionMessage">Undo</a> 
                            </div> 
                            <button class="ADMIN deleteButton" type="button">X</button>
                            <a href="ADMIN_Individual_Page.html?${item.itemKey}">  
                            <img class="bottomImage" src="${item.image}" alt="${item.image}">
                            </a>
                            <figcaption>${item.name}</figcaption>
                        </figure>   
                
            `;
            })
            .join('');
        
        // adds the add item button and add item form at the end of the catalog each time items are generated
        const final_htmlString = htmlString + `
                                                <figure class="ADMIN bottomIndividualItem">
                                                    <em class="fa fa-plus-circle" style="font-size:200px;color:grey" id="btn open"></em> 
                                                    <p> Add Item  </p>
                                                </figure>
                                                <div class="form-popup" id="myForm">
                                                    <form class="form-container">
                                                    <h1>Add Item</h1>
                                                
                                                    <label for="Model"><b>Model</b></label>
                                                    <input id="input model" type="text" placeholder="Enter Model" name="Model" required>

                                                    <label for="Brand"><b>Brand</b></label>
                                                    <input id="input brand" type="text" placeholder="Enter Brand" name="Brand" required>
                                                
                                                    <label for="Categories"><b>Categories</b></label>
                                                    <input id="input categories" type="text" placeholder="Enter Categories" name="Categories" required>
                                                    
                                                    <label for="Uses"><b>Uses</b></label>
                                                    <input id="input uses" type="text" placeholder="Enter Uses" name="Uses" required>
                                                    
                                                    <label for="Accessories"><b>Accessories</b></label>
                                                    <input id="input accessories" type="text" placeholder="Enter Accessories" name="Accessories" required>
                                                    
                                                    <label for="Description"><b>Description</b></label>
                                                    <input id="input description" type="text" placeholder="Enter Description" name="Description" required>
                                                    
                                                    <label for="image"><b>Insert Image</b></label>
                                                    <input id="input image" type="file" name="reqInsertImage">
                                                    
                                                    <button type="submit" class="btn add" id="btn add">Add Item</button>
                                                    <button type="button" class="btn cancel" id="btn cancel">Close</button>
                                                    </form>
                                                </div>       
                                                `;
        
        resultCount.innerHTML = items.length + " results";
        itemCatalog.innerHTML = final_htmlString;
    };

    function displayItemsByNameAndCategory(searchString) {
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.category.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        displayItems(filteredItems);
    }

    function displayItemsByCategory(searchString) {
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.category.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        displayItems(filteredItems);
    }


    /*
    loadItems is the first method called when the script is run. This method populates our CatalogItems array
    and makes a call to displays all items contained. 
    */
    const loadItems = async () => {
    
        //Populate CatalogItemsFull with data from the SQL server: 'sprint2cs341', database: 'sprint2', table: 'products'
        //only do so if the variable is empty (the data has not been loaded yet)
        if (CatalogItemsFull.length == 0){
            console.log("Attempting to access item data with POST");
            $.post({
                traditional: true,
                url: '/catalogData',    // url
                success: function(data, ) {// success callback
                    readServerData(data);
                }
            }).fail(function(jqxhr, settings, ex) { 
                alert('Accessing product data failed, ' + ex + "\nLoading static dataset."); 
                loadStaticDataset();
            });
        }

        //load maellable list
        CatalogItems = CatalogItemsFull;
    };

    function loadStaticDataset(){
        CatalogItems = [{ name: "Canon DLSR", image: "", category: "recording" },
        { name: "Canon R", image: "https://static.bhphoto.com/images/images1000x1000/1536120359_1433711.jpg", category: "recording" },
        { name: "Canon 80D", image: "https://www.bhphotovideo.com/images/images2500x2500/canon_1263c005_eos_80d_dslr_camera_1225876.jpg", category: "recording" },
        { name: "Canon 90D", image: "https://images-na.ssl-images-amazon.com/images/I/61f9Hy-cujL._AC_SX679_.jpg", category: "recording" },
        { name: "Vanko", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6419/6419996_sd.jpg;maxHeight=200;maxWidth=300", category: "conferencing" },
        { name: "Epson - HC 3800", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366530_sd.jpg;maxHeight=200;maxWidth=300", category: "conferencing" },
        { name: "Epson - HC 2250", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428462_sd.jpg;maxHeight=200;maxWidth=300", category: "conferencing" },
        { name: "LG - PF50KA", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6228/6228221_sd.jpg;maxHeight=200;maxWidth=300", category: "conferencing" },
        { name: "Logitech - C922", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5579/5579380_sd.jpg;maxHeight=200;maxWidth=300", category: "streaming" },
        { name: "Logitech - HD Webcam", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9928/9928354_sa.jpg;maxHeight=200;maxWidth=300", category: "streaming" }]
    }

    /*
    This method adds an image of the university logo to any items that do not contain images 
    */
    function addFillersToEmptyImages(item) {
        if (item.image.localeCompare("") == 0 ) {
            item.image = placeholderImage;
        }
    } 

    //A helper function to read items from the database format into the local CatalogItems format 
    //and load into CatalogItemsFull
    function readServerData(data){
        console.log("Attempting to load item data from SQL server");
        //console.log(data)
        productDataArray = data.productData;
        console.log(productDataArray);
        productImageArray = data.imageData;
        console.log(productImageArray);
        var i;
        // CatalogItemsFull.length = productDataArray.length - 1;
        console.log("productDataArray Length: " + productDataArray.length);
        console.log("productImageArray Length: " + productImageArray.length);
        console.log("CatalogItemsFull Length: " + CatalogItemsFull.length);
        for (i = 0; i < productDataArray.length; i++) {
            prodData = productDataArray[i];
            //console.log("productDataArray[" + i + "]");
            console.log(prodData);
            // assigns brand name
            var b = prodData.brand;
            if (b == null) {
                b = "";
            }
            // assigns model name
            var n = prodData.model_num;
            if (n == "") {
                n = "No Model";
            }
            // combines brand and model for full title
            var bn = b + " " + n;
            // assigns category
            var c = prodData.category;
            if (c == null) {
                c = "";
            }
            var k = prodData.item_key;
            // console.log("type of key" + typeof(k));
            if (k == null){
                k = "";
            }
            //get the correct image
            var img = null;
            var imgValue = prodData.picture;
            if (imgValue != null){
                if (imgValue == "YES"){
                    //get the first image where item key matches image's key number
                    for(let j = 0; j < productImageArray.length; j++){
                        if (k == productImageArray[j].key_number){
                            img = productImageArray[j].image;
                            console.log("Found image for " + bn + ": " + img);
                            break;
                        }
                    }
                    if (img == null){
                        img = placeholderImage;
                        console.log("Couldn't find image for " + bn);
                    }
                } else {
                    img = placeholderImage;
                }
            } else {
                img = placeholderImage;
            }

            var productjson = {itemKey:k, name:bn, image:img, category:c};
            CatalogItemsFull[i] = productjson;
        }
        console.log(CatalogItemsFull);
        console.log("Item loading complete!");
        if (init){
            displayItems(CatalogItems);
            init = false;
        }

        //For some asinine reason, this line has to be here. JSBE doesn't know why. If you do, please tell us.
        loadButtonListeners();
    }

    //A method to reassign deletion button listeners
    function loadButtonListeners(){
        $(".ADMIN.deleteButton").click(function(){
            //alert("The paragraph was clicked.");
            console.log("Clicked delete button.");
        });
        
        //Sets up the item deletion overlay for an item
        $(".ADMIN.deleteButton").on("click", HideItem);
        $(".undoDeletionMessage").on("click", RevealItem);
        $(".confirmDeletionMessage").on("click", DeleteItem);

        document.getElementById("btn open").addEventListener("click", openForm); // Add event listener for opening the form
        document.getElementById("btn add").addEventListener("click", addProduct); // Add event listener for closing the form
        document.getElementById("btn cancel").addEventListener("click", closeForm); // Add event listener for closing the form
        

        console.log("Loaded button listeners!");
    }

    
    //opens the add item form
    function openForm(event) {
        document.getElementById("myForm").style.display = "block";
    }
        
        
    //closes the add item form
    function closeForm(event) {
        document.getElementById("myForm").style.display = "none";
    }

    //called when a new product is being added
    function addProduct(event){

        console.log("Attempting to add the item")

        //retrieve the product values from the HTML form
        var model_num = document.getElementById('input model').value
        var brand = document.getElementById('input brand').value
        var categories = document.getElementById('input categories').value
        var uses = document.getElementById('input uses').value
        var accessories = document.getElementById('input accessories').value
        var description = document.getElementById('input description').value
        var picture = document.getElementById('input image').value

        //perform any parsing here

        //build a JSON to send to the SQL server
        productInfo = { 
            model_num: model_num,
            brand:brand,
            category:categories,
            uses:uses,
            accessories:accessories,
            description:description,
            picture:picture
        }

        console.log("Printing add-product info.");

        //send the JSON to the SQL server with a post request
        console.log("Attempting to add new product data with POST");
        $.post({
            traditional: true,
            url: '/addItem',    // url
            data: productInfo,
            dataType: 'json',
            success: function(data, ) {// success callback
                successAdd(data);
            }
        }).fail(function(jqxhr, settings, ex) { 
            alert("Couldn't access server." + ex); 
        });

    }

    //closes form after an item has been deleted
    function successAdd(data){
        if (data == false){
            closeForm();
            //tell the user to reload the page because doing it here is too fast
            alert("Item added! Reload page to see updated catalog."); 
        }
    }


    //called when "x" deletion button is clicked
    function HideItem(event)
    {
        console.log("Trying to delete item.");
        $(this).prev().css("visibility","visible");
        $(this).prev().css("cursor","default");
    }

    // called when "undo" is clicked
    function RevealItem(event)
    {
        $(this).parent().css("visibility","hidden");
        $(this).parent().css("cursor","pointer");
    }

    //called when "delete" is clicked
    function DeleteItem(event) {
        console.log("Confirm item deletion attempted.");
        var ik = $(this).attr("key");
        var c = $(this).attr("category");

        console.log("category: " + c)
        
        productKey = { 
            item_key:ik,
            category:c
        }

        //BIG PROBLEM
        //this presents a way for users to insert custom SQL code into the database
        //we could add something to verify that the item key is an integer and the 
        //category only has strings that are valid categories in the future

        //attempt deletion w/ POST
        console.log("Attempting to delete item from key with POST");
        $.post({
            traditional: true,
            url: '/keyDelete',    // url
            data: productKey,
            dataType: 'json',
            success: function(data, ) {// success callback
                successDelete(data);
            }
        }).fail(function(jqxhr, settings, ex) { 
            alert("Couldn't access server." + ex); 
        });
    }

    //reloads catalog after an item has been deleted
    function successDelete(data){
        if (data == false){
            //tell the user to reload the page because doing it here is too fast
            alert("Item deleted! Reload page to see updated catalog."); 
        }
    }

    
    //initial population of page when script is run
    loadItems();

});

