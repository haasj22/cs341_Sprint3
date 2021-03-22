//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 11 2021
//A router for the main catalog page to request a list of the product data
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
    error:null,
    productData:[],
    imageData:[]
};

//POST reciever, request the product data from the server
router.post('/', function(req, res, next) {
    console.log("Accessing products table from SQL server.");
    serverfunctions.dbquery("SELECT * FROM PRODUCTS;", receiveProductData);

    // helper fn process the data from the SQL Server 
    function receiveProductData(error, results) {
        console.log("Recieved products table from SQL server.");
        orderObj.error = error;
        console.log("Error in receiveProductData: " + orderObj.error);
        orderObj.productData = results;
        console.log(orderObj.productData);
        console.log("Finished post request.");
    }

    serverfunctions.dbquery("SELECT * FROM PRODUCTIMAGES;", receiveImageData);
    
    function receiveImageData(error, results) {
        console.log("Received images table from SQL server.");
        orderObj.error = error;
        console.log("Image error: " + orderObj.error);
        orderObj.imageData = results;
        console.log("Finished post request.");
        console.log(orderObj.imageData);
        res.json(orderObj);
    }

});


module.exports = router;
