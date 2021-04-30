//Author: 
//Version: April 21 2021
// A router for sending a request to update the admin individual page image
// Copied from addItem.js and itemData.js
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//a variable to hold the data
const orderObj = {
    errorProduct:null,
    errorImage:null,
    productData:[],
    imageData:[]
};

//POST reciever, request the product data from the server
router.post('/', function(req, res, next) {

    //retrieve the key from req
    var item_key = req.body.item_key;

    //the first image slot (main image) should be updated currently
    var image_id = req.body.image_id;

    //retrieve image url from req
    var image = req.body.image;

    serverfunctions.dbquery("SELECT * FROM PRODUCTS WHERE item_key = '" + item_key + "';", updateImageData);

    // update the image url
    function updateImageData(error, results) {
        console.log("1: " + image + " " + item_key + " " + image_id + " ");
        serverfunctions.dbquery("UPDATE PRODUCTIMAGES SET image = '" + image + "' WHERE key_number= '" + item_key + "' AND image_id= '" + image_id + "';", receiveImageData);
    }

        //Format: key_number  image_id  model  image (the url)
        //Ex. for logitech brio
        //        1           1         Brio   https:/...main
        //        1           2         Brio   https:/...front
        //        1           3         Brio   https:/...back

    // process results from SQL server and send error/results back to client
    function receiveData(error, results) {
        res.send(error);
        console.log("2: " + image + " " + item_key + " " + image_id + " ");
        console.log("Finished insert image request.");
    }
});

module.exports = router;