
//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 22 2021
//A router for the ADMIN_Individual_Page to request a change in a product's data
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

    //step 1 extract variables from JSON
    var ik = req.body.item_key;
    var mn = req.body.model_num;
    var b = req.body.brand;
    var p; //does not use
    var c = req.body.category;
    var d = req.body.description;
    var rl; // does not use
    var u = req.body.uses;
    var a; //does not use

    //step 2 Send command to database
    serverfunctions.dbquery("UPDATE PRODUCTS SET model_num ='" + mn + "', brand ='" + b + "', category ='" + c 
        +  "', description ='" + d + "', uses ='" + u + "' WHERE item_key = '" + ik + "';", receiveData);

    // step 3 fn process the results from the SQL Server and send the error value to the client
    function receiveData(error, results){
        res.send(error);
    }
});


module.exports = router;
