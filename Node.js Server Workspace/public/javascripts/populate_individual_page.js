let CatalogItemsFull = [];
let CatalogItems = [];

const itemName = document.getElementById('itemName');
const modelText= document.getElementById('modelText');
const categotyText  = document.getElementById('categoryText');
const usesText = document.getElementById('usesText');
const accessoriesText = document.getElementById('accessoriesText');
const descriptionText = document.getElementById('descriptionText');




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

    //for now we are using a static data set
    CatalogItems = CatalogItemsFull;

    //console.log(CatalogItems);
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

//A helper function to read items from the database format into the local CatalogItems format 
//and load into CatalogItemsFull
function readServerData(data){
    console.log("Attempting to load item data from SQL server");
    //console.log(data)
    var productDataArray = data.productData;
    console.log(productDataArray);
    var i;
    //skipping the first entry in the table, a dummy entry
    CatalogItemsFull.length = productDataArray.length-1;
    console.log("productDataArray Length: " + productDataArray.length);
    console.log("CatalogItemsFull Length: " + CatalogItemsFull.length);
    for (i = 1; i < productDataArray.length; i++){
        var prodData = productDataArray[i];
        //console.log("productDataArray[" + i + "]");
        //console.log(prodData);
        var b = prodData.brand;
        if (b == null){
            b = "";
        }
        var n = prodData.name;
        if (n == null){
            n = "No Name";
        }
        var bn = b + " " + n;
        var img = placeholderImage;
        var c = prodData.category;
        if (c == null){
            c = "";
        }
        var productjson = {name:bn, image:img, category:c};
        CatalogItemsFull[i] = productjson;
    }
    console.log(CatalogItemsFull);
    console.log("Item loading complete!");
}

//initial population of page when script is run
populatePage();

function populatePage() {

    var pageArguments = queryString.split("|");
    itemName.innerHTML = pageArguments[0];
    document.getElementById('mainImage').src = 

    var searchString = "Canon R".toLowerCase();
    loadStaticDataset();
    var itemSearched;
    for (var i = 0; i < CatalogItems.length; i++) {
        if (CatalogItems[i].name.toLowerCase() == searchString) {
            itemSearched = CatalogItems[i];
        }
    }   


    if (itemSearched != null) {
        updatePageText(itemSearched);
    } else {
        console.log("Item could not be found by name.");
        alert("failed to find item name in catalog");
    }

    
}

function updatePageText(item) {
    itemName.innerHTML = item.name;
}