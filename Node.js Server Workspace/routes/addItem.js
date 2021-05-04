//Author: Alex Junkins, Adrian Muth, Daniel Co and Justin Cao, William Lau, Haley Welliver, Malia L
//Version: April 5 2021
//A router for the ADMIN_catalog to request a new item be made
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//POST reciever, add new product data
//Note: This does not currently change reservation lenth, accessories, or anything in the pictures table
router.post('/', function(req, res, next) {
    
    console.log("recieved product data add request.");

    //step 1 extract variables from JSON
    var item_key = -1; //if an item is added with the key -1, there was an error
    var model_num = req.body.model_num;
    var brand = req.body.brand;
    var picture = ""; //does not currently use pictures, set to an empty string by default
    var category = req.body.category;
    var description = req.body.description;
    var reservationLength = false; // variable not used
    var uses = req.body.uses;
    var accessories = req.body.accessories; //does not use accessories because no accessories column exists in the database
    var time_deleted = new Date().toISOString().slice(0, 19).replace('T', ' '); //current time, from https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    serverfunctions.dbquery("SELECT * FROM PRODUCTS ORDER BY item_key DESC LIMIT 1;", recievedKey);


    //step 2 retrieve most recent item key and use it to add the new product data to the database.
    //swiped from Alex Junkins' HW5 for CS341 Software Engineering
    function recievedKey(error, results){
        item_key = results[0].item_key + 1;
        serverfunctions.dbquery("INSERT INTO PRODUCTS (item_key, model_num, brand, picture, category, description, reservation_length, accessories, uses, time_deleted) " + 
                            "VALUES ('" + item_key + "', '" + model_num + "', '" + brand + "', '" + picture + "', '" + category + "', '" + description + "', " 
                                    + reservationLength + ", '" + uses + "', '" + accessories + "', '" + time_deleted + "');", receiveData);

    }

    // step 3 fn process the results from the SQL Server and send the error/result value to the client
    function receiveData(error, results){
        res.send(error);
    }
});


module.exports = router;