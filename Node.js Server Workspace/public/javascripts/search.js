$(document).ready(function () {
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

    //retrieve returnCount <p> div to update with every item display
    const resultCount = document.getElementById('resultCount');

    //retrive searchbar to extract search criteria
    const searchBar = document.getElementById('searchBar');
    //an image of the university logo
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

    // //send items to be displayed
    // displayItems(filteredItems);

    //Display all categories when viewAll button is clicked
    viewAll.addEventListener('click', (e) => {
        //return all values to CatalogItems array
        loadItems();

        //send items to be displayed
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


    /*
    displayItems takes an array of items and converts each item into a HTML block. Each of these blocks is appended together and inserted into bottomCategory div of mainCatelog 
    */
    const displayItems = (items) => {
        items.forEach(addFillersToEmptyImages);
        const htmlString = items
            .map((item, index) => {
                if (!item.category.toLowerCase().includes("deleted")){
                return ` 
        <a href="VIEWER_individual_page.html?${item.itemKey}">               
            <figure class="bottomIndividualItem">
              <img class="bottomImage" src="${item.image}" alt="${item.name}">
              <figcaption>${item.name}</figcaption>
            </figure>           
        </a>
        `;   
                }
            })
            .join('');
        resultCount.innerHTML = items.length + " results";
        itemCatalog.innerHTML = htmlString;
    };

    /*
    This method adds an image of the university logo to any items that do not contain images 
    */
    function addFillersToEmptyImages(item) {
        if (item.image.localeCompare("") == 0) {
            item.image = placeholderImage;
        }
    }
    /*
    This method adds an image of the university logo to any items that do not contain images 
    maybe an error...?
    */
   /*
    function addFillersToEmptyImages(item) {
        if (item.image.localeCompare("") == 0) {
            item.image = placeholderImage;
        }
    }
    */

    
    /*
    filters items using both name and category and makes call to display them
    */
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


    /*
    displayItemsByCategory filters and displays solely when category buttons are clicked 
    */
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
       

        // if items have already been loaded during the session, retrieve them from sessionStorage
        if (sessionStorage.getItem("catalog_items"))
        {
            CatalogItemsFull = JSON.parse(sessionStorage.getItem("catalog_items"));
            CatalogItems = CatalogItemsFull;
            // display items (this code would be called in readServerData if we had queried the sql server)
            if (init){
                displayItems(CatalogItems);
                init = false;
            }
        }
        else 
        {
            //Populate CatalogItemsFull with data from the SQL server
            //only do so if the variable is empty (the data has not been loaded yet)
            if (CatalogItemsFull.length == 0) {
                console.log("Attempting to access item data with POST");
                $.post({
                    traditional: true,
                    url: '/catalogData',    // url
                    success: function (data,) {// success callback
                        readServerData(data);
                        // save items to sessionStorage
                        sessionStorage.setItem("catalog_items",JSON.stringify(CatalogItemsFull));
                    }
                }).fail(function (jqxhr, settings, ex) {
                    alert('Accessing product data failed, ' + ex + "\nLoading static dataset.");
                    loadStaticDataset();
                });
            }

            //load maellable list
            CatalogItems = CatalogItemsFull;

        }
    };

    function loadStaticDataset() {
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

    //A helper function to read items from the database format into the local CatalogItems format 
    //and load into CatalogItemsFull
    function readServerData(data) {
        console.log("Attempting to load item data from SQL server");
        productDataArray = data.productData;
        //console.log(productDataArray);
        productImageArray = data.imageData;
        //console.log(productImageArray);
        var i;
        console.log("productDataArray Length: " + productDataArray.length);
        console.log("productImageArray Length: " + productImageArray.length);
        //console.log("CatalogItemsFull Length: " + CatalogItemsFull.length);
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
                            //console.log("Found image for " + bn + ": " + img);
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
        //console.log(CatalogItemsFull);
        console.log("Item loading complete!");
        if (init){
            displayItems(CatalogItems);
            init = false;
        }
    }

    //initial population of page when script is  run
    loadItems();

});

