//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 9 2021
// A short router to test client connection to the website
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



const orderObj = {
    error:null,
    data:[    ]
};

/* GET orders listing. */
router.get('/', function(req, res, next) {
    serverfunctions.dbquery("SELECT * FROM products;", recieveData);

    /* helper fn process the data from the SQL Server */
    function recieveData(error, results) {
        orderObj.error = error;
        orderObj.data = results;
        res.json(orderObj);
        console.log("Finished post request.");
    }
});


router.post('/', function(req, res, next) {
    console.log("POST: " + JSON.stringify(orderObj));
    res.json(orderObj);
});

module.exports = router;
