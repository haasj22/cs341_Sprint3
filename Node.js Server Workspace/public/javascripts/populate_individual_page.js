//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 21 2021
// Pulls information on items from database and loads items based on keys

$(document).ready(function () {

    let CatalogItemsFull = [];
    let CatalogItems = [];

    const itemName = document.getElementById('itemName');
    const modelText = document.getElementById('modelText');
    const categoryText = document.getElementById('categoryText');
    const usesText = document.getElementById('usesText');
    const accessoriesText = document.getElementById('accessoriesText');
    const descriptionText = document.getElementById('descriptionText');

    var placeholderImage = "https://lh3.googleusercontent.com/GQIuf05jvVfDru6tdwR_zEsRhNj59K3QKANkpQCS4cxinfu4DiwkCFFM0oi71calYudq9D4-jjwFYv1U0raDqP4blg0SkR3wQRLN4CmL1bHeLdmrnsFxMLiWo0ttWxLmfVNdIKz0KAAn7iSBs3NsOoCP7mQpnvdRdWWjy6DChe_E_BFOOxwfM01P5BwYy_FyHtWaYziquGADRjymlp9Xls_H-67k7JMFU8E3FRW4ZA1-rAk2VWmccJW3kQEwRzvL0zOmfss47m6rvKQXRZCdpNFgfsLxfPhmFfxNg8i5NUjgXFwTlkg4uLsklfeWRqG87K0snnoy-KuTj040_2PuicI9LQuMo5UwaGNReCGfOb5fEgy_ogXfmlUZWwENyqnnlHXYEHaYokz8HajekTkVo-apRo88_l9mKrHZbMHra9ukgJj0T878vC-_o4AKxkLSKZvF_l54RTlGM5sO5ET2M68uHensYDY9jl_-Hf9nhQyA_gLxQNtZkzX3rkm_WK3_br1hzz9XDQxGEaPKVvtp-ZE-oOQvCbme6h_y0kVS0MQ5Esvi1YHMHSfr2ddgVZvsMWSbwLWwUkHQUctFNB8UlgdavPGFcy5aCR27sdJbqB8Ea0NOOMn9DperBRpoFRw8hSt1M0mvaaaqfRlJtKPGihnkhxgA_taDfAchqrG9xxPayCXtXt50RS49VyJM5bdU4d7wlNTp5OWsY_8KaoSwe9yW=w2454-h1642-no?authuser=0";





    /*
    loadItems is the first method called when the script is run. This method populates our CatalogItems array
    and makes a call to displays all items contained. 
    */
    const loadItems = async () => {

        //Populate CatalogItemsFull with data from the SQL server: 'sprint2cs341', database: 'sprint2', table: 'products'
        //only do so if the variable is empty (the data has not been loaded yet)
        if (CatalogItemsFull.length == 0) {
            console.log("Attempting to access item data with POST");
            $.post({
                traditional: true,
                url: '/catalogData',    // url
                success: function (data,) {// success callback
                    readServerData(data);
                }
            }).fail(function (jqxhr, settings, ex) {
                alert('Accessing product data failed, ' + ex + "\nLoading static dataset.");
                loadStaticDataset();
            });
        }

        //load maellable list
        CatalogItems = CatalogItemsFull;
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
                b = "No_Brand";
            }
            // assigns model name
            var n = prodData.model_num;
            if (n == "") {
                n = "No_Model";
            }
            // combines brand and model for full title
            var bn = "";
            if (prodData.brand == null){
                bn = n;
            } else {
                bn = b + " " + n;
            }
            var img = placeholderImage;
            // assigns category
            var c = prodData.category;
            if (c == null) {
                c = "";
            }
            // assigns description
            var d = prodData.description;
            if (d == null) {
                d = "No description.";
            }
            // assigns uses
            var u = prodData.uses;
            nullvar = "NULL";
            if (u.normalize().valueOf() == nullvar.valueOf()) {
                u = "No uses.";
            }
            var k = prodData.item_key;
            // console.log("type of key" + typeof(k));
            if (k == null){
                k = "";
            }
            // key_number, image_id(starts at 1)
            // searches through image table for first image with matching item key and returns it
            for (j = 0; j < productImageArray.length; j++) {
                if (k == null) {
                    break;
                }
                imgData = productImageArray[j];
                if(imgData.image_id == 1){
                    img = imgData.image;
                    //console.log("image url: " + img);
                }
            }
            //temporary line, until images are fixed
            var img = placeholderImage;
            //temporary line, uncil accessories are added
            var a = "No accessories."

            var productjson = {itemKey:k, name:bn, brand:b, model_num:n, image:img, category:c, uses:u, accessories:a, description:d};
            CatalogItemsFull[i] = productjson;
        }
        console.log(CatalogItemsFull);
        console.log("Item loading complete!");

        //once database has loaded populate page 
        populatePage();
    }
  
    /*
    populatePage finds the item in the database based of item_key that is sent though the string query 
    */
    function populatePage() {
        //pull query String from selected url
        var itemKey = location.search.substring(1);
        
        //get item object from catalog  (key-1 because item keys are indexed starting at 1)
        var itemSearched = CatalogItems[itemKey - 1];

        if (itemSearched != null) {
            updatePageText(itemSearched);
        } else {
            console.log("Item could not be found by name.");
            alert("failed to find item name in catalog");
        }
    }

    /*
    updatePageText takes an item and transfers its attributes to the html page ()
    */
    function updatePageText(item) {

        //add more initiations when more data is avaliable from database team
        itemName.innerHTML = item.name;
        modelText.innerHTML = item.brand + "/" + item.model_num;
        var categoriesArray = item.category.split(" ");
        var categoriesString = categoriesArray[0];
        var i;
        for (i = 1; i < categoriesArray.length; i++){
            categoriesString = categoriesString + ", " + categoriesArray[i];
        }
        categoryText.innerHTML = categoriesString;
        usesText.innerHTML = item.uses;
        accessoriesText.innerHTML = item.accessories;
        descriptionText.innerHTML = item.description;
        document.getElementById('mainImage').src = item.image;
    }

    //load items when page starts 
    loadItems();
});