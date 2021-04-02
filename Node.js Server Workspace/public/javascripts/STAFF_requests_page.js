// File initialized by Trey Dettmer

$(function()
{

    let CatalogItemsFull = [];
    let CatalogItems = [];
    //retrieve category elements from document for event listners
    const requestButton = document.getElementById('request');
    //an image of the university logo
    var placeholderImage = "https://www.universitycounselingjobs.com/institution/logo/logo2(4).png";

    let itemListHtml = document.getElementById("item_list");

    requestButton.addEventListener('click', (e) => {
        console.log("pressed request button");
        //sendEmail();
    });


    /*
    This method updates the displayed requests with the actual requests saved in sessionStorage
    */
    function DisplayRequests() {
        if (sessionStorage.getItem("requested_item_ids")) {
            //load array of requested items from sessionStorage
            let requested_item_ids = JSON.parse(sessionStorage.getItem("requested_item_ids"));
            //check that at least one item has been requested
            if (requested_item_ids.length > 0)
            {
                const htmlString = requested_item_ids.map((itemId, index) => {
                    let item = CatalogItemsFull.find(productJson => productJson.itemKey == itemId);
                    //replace null item images with placeholder image
                    if (item.image.localeCompare("") == 0) {
                        item.image = placeholderImage;
                    }
                    return `
                    <li>${item.name} 
                        <button>Remove Item</button> 

                        <table> <!--table-->
                            <caption>Quantity</caption>
                                <th id="quantity_count">
                                    <thead>
                                        <tr>
                                            <td>
                                                <!--select input type quantity Options-->
                                                <select name="drop-down-list" id="numOfCheesecakes">
                                                    <option value="1" id="1">1</option>
                                                    <option value="2" id="2">2</option>
                                                    <option value="3" id="3">3</option>
                                                    <option value="4" id="4">4</option>
                                                    <option value="5" id="5">5</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </thead>
                                </th>
                        </table>

                        <textarea id="comments" name="comments" rows="3" cols="10"
                        placeholder="Enter any comments here"></textarea>
                        <label for="Comments:">Comments:</label>

                        <div id="main_image_div">
                            <img src="${item.image}"
                        alt="${item.name}" class="main_image">
                        </div>
                    </li>`;}).join('');
                //update page html
                itemListHtml.innerHTML = htmlString;
            }
        }
    }


    /*
    Copied from STAFF_search.js
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
              alert('Accessing product data failed, ' + ex + ".");

          });
      }

      //load maellable list
      CatalogItems = CatalogItemsFull;
  };
  /*
  Copied from STAFF_search.js
  A helper function to read items from the database format into the local CatalogItems format 
  and load into CatalogItemsFull
  */
  function readServerData(data) {
      console.log("Attempting to load item data from SQL server");
      productDataArray = data.productData;
      productImageArray = data.imageData;
      var i;
      for (i = 0; i < productDataArray.length; i++) {
          prodData = productDataArray[i];

          // assigns brand name
          var b = prodData.brand;
          if (b == null) {
              b = "";
          }
          // assigns model name
          var n = prodData.model;
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
                          break;
                      }
                  }
                  if (img == null){
                      img = placeholderImage;
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
      console.log("Item loading complete!");
      //update page with requested items
      DisplayRequests();
  }

  function sendEmail() { 
      Email.send({ 
        Host: "smtp.gmail.com", 
        Username: "hanshaas4321@gmail.com", 
        Password: "password", 
        To: 'hanshaas4321@gmail.com',
        From: "hanshaas4321@gmail.com", 
        Subject: "Camera checked out", 
        Body: "(1) JVC Camera has been requested by Staff Member 'x' ", 
      }) 
        .then(function (message) { 
          alert("mail sent successfully") 
        }); 
  } 
  //load items from database
  loadItems();
});