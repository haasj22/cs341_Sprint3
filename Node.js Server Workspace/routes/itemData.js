//Author: Alex Junkins, Adrian Muth, Reggie Jan Marc Nillo, and Justin Cao
//Version: April 10, 2021
//A router for the individual pages to request the data for a single item based on its key
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


    console.log("Accessing products table from SQL server.");
    serverfunctions.dbquery("SELECT * FROM PRODUCTS WHERE item_key = '" + item_key + "';", receiveProductData);


    //process the product data and request the image data
    function receiveProductData(error, results) {
        console.log("Recieved products table from SQL server.");
        orderObj.errorProduct = error;
        orderObj.productData = results;
        console.log(orderObj.productData);
        serverfunctions.dbquery("SELECT * FROM PRODUCTIMAGES WHERE key_number = '" + item_key + "';", receiveImageData);
    }

    //process the image data and send back to res
    function receiveImageData(error, results) {
        console.log("Received images table from SQL server.");
        orderObj.errorImage = error;
        orderObj.imageData = results;
        console.log(orderObj.imageData);
        res.json(orderObj);
        console.log("Finished post request.");
    }

    /*
    async function doSomething() {
        let result = await functionThatReturnsPromiseA();
        return result + 1;
    } */

});


module.exports = router;
