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

//POST reciever, request the product data from the server
router.post('/', function(req, res, next) {

    // retrieve needed variables from req
    var key_number = req.body.key_number;
    var image_id = req.body.image_id;
    var image = req.body.image;

    // update the image url
    serverfunctions.dbquery("UPDATE PRODUCTIMAGES SET image = '" + image + "' WHERE key_number= " + key_number + " AND image_id= " + image_id + ";", receiveData);

    //Format: key_number  image_id  model  image (the url)
    //Ex. for logitech brio
    //        1           1         Brio   https:/...main
    //        1           2         Brio   https:/...front
    //        1           3         Brio   https:/...back

    // process results from SQL server and send error/results back to client
    function receiveData(error, results) {
        res.send(error);
    }
});

module.exports = router;