//Author Aidan Day Sprint 2 CS 341
//Structure of search was taken from James Q Quick's JS Search Bar Tutorial
//https://www.youtube.com/watch?v=wxz5vJ1BWrc



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
    
    //retrieve returnCount <p> div to update with every item display
    const resultCount = document.getElementById('resultCount');

    

    //retrive searchbar to extract search criteria
    const searchBar = document.getElementById('searchBar');
    let CatalogItems = [];

    /*
    his method refreshes the search criteria evertime user releases a key stroke in the searchbar. 
    */
    searchBar.addEventListener('keyup', (e) => {
        //normalizing search String
        const searchString = e.target.value.toLowerCase();
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });

    viewAll.addEventListener('click', (e) => {
        //return all values to CatalogItems array
        loadItems();

        //send items to be displayed
        resultCount.innerHTML = CatalogItems.length + " results";
        displayItems(CatalogItems);
    });

    conferencing.addEventListener('click', (e) => {
        //normalizing search String
        const searchString = "conferencing";
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });

    streaming.addEventListener('click', (e) => {
        //normalizing search String
        const searchString = "streaming";
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });

    recording.addEventListener('click', (e) => {
        //normalizing search String
        const searchString = "recording";
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });

    presentation.addEventListener('click', (e) => {
        //normalizing search String
        const searchString = "presentation";
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });
    
    audio.addEventListener('click', (e) => {
        //normalizing search String
        const searchString = "audio";
        
        //creating new subset array containing items that contain the searchString in there name or catagory.
        const filteredItems = CatalogItems.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchString) ||
                item.catagory.toLowerCase().includes(searchString)
            );
        });

        //send items to be displayed
        resultCount.innerHTML= filteredItems.length + " results";
        displayItems(filteredItems);
    });

    /*
    loadItems is the first method called when the script is run. This method populates our CatalogItems array
    and makes a call to displays all items contained. 
    */
    const loadItems = async () => {
        /* try {
            const res = await fetch('https://hp-api.herokuapp.com/api/characters');
            CatalogItems = await res.json();
            displayItems(CatalogItems);
        } catch (err) {
            console.error(err);
        } */

        //for now we are using a static data set
        CatalogItems = [{ name: "Cannon DLSR", image: "https://static.bhphoto.com/images/images500x500/jvc_gz_e100b_gz_e100_full_hd_memory_1357667269_909762.jpg", catagory:"recording"},
        { name: "Cannon R", image: "https://static.bhphoto.com/images/images1000x1000/1536120359_1433711.jpg", catagory:"recording"},
        { name: "Cannon 80D", image: "https://www.bhphotovideo.com/images/images2500x2500/canon_1263c005_eos_80d_dslr_camera_1225876.jpg", catagory:"recording"},
        { name: "Cannon 90D", image: "https://images-na.ssl-images-amazon.com/images/I/61f9Hy-cujL._AC_SX679_.jpg", catagory:"recording"},
        { name: "Vanko", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6419/6419996_sd.jpg;maxHeight=200;maxWidth=300", catagory:"conferencing"},
        { name: "Epson - HC 3800", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6366/6366530_sd.jpg;maxHeight=200;maxWidth=300", catagory:"conferencing"},
        { name: "Epson - HC 2250", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6428/6428462_sd.jpg;maxHeight=200;maxWidth=300", catagory:"conferencing"},
        { name: "LG - PF50KA", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6228/6228221_sd.jpg;maxHeight=200;maxWidth=300", catagory:"conferencing"},
        { name: "Logitech - C922", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5579/5579380_sd.jpg;maxHeight=200;maxWidth=300", catagory:"streaming"},
        { name: "Logitech - HD Webcam", image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/9928/9928354_sa.jpg;maxHeight=200;maxWidth=300", catagory:"streaming"}]
    };

    /*
    displayItems takes an array of items and converts each item into a HTML block. Each of these blocks is appended together and incerted into bottomCategory div of mainCatelog 
    */
    const displayItems = (items) => {
        const htmlString = items
            .map((item) => {
                return `                
            <figure class="bottomIndividualItem">
                <img class="bottomImage" src="${item.image}" alt="camera">
                <figcaption>${item.name}</figcaption>
            </figure>
            
            
        `;
            })
            .join('');
        itemCatalog.innerHTML = htmlString;
    };

    loadItems();
