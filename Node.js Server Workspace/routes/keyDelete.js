
//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 31 2021
//A router for the ADMIN_catalog to delete an item based on its key
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//POST reciever, modify product data
//Note: This does not currently change reservation lenth, accessories, or anything in the pictures table
router.post('/', function(req, res, next) {
    
    console.log("recieved product data modification request.");

    //step 1 extract variables from JSON and modify
    var ik = req.body.item_key;
    var c = req.body.category;
    if (!c.toLowerCase().includes('deleted')) {
        c = c + " Deleted";
    }

   //step 2 Send command to database
   serverfunctions.dbquery("UPDATE PRODUCTS SET category='" + c + "' WHERE item_key='" + ik + "';", receiveData);


   // step 3 fn process the results from the SQL Server and send the error value to the client
   function receiveData(error, results){
       res.send(error);
   }
});


module.exports = router;
