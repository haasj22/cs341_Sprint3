//Author: Alex Junkins, Adrian Muth, and Justin Cao
//Version: March 9 2021
// A short router to test client connection to the website
var express = require('express');
var router = express.Router();
const orderObj = {
    error:null,
    data:[
        {topping:"cherry",quantity:2},
        {topping:"plain",quantity:6},
        {topping:"cherry",quantity:6},
        {topping:"chocolate",quantity:3}
    ]
};

/* GET orders listing. */
router.get('/', function(req, res, next) {
    console.log("GET: " + JSON.stringify(orderObj));
    res.json(orderObj);
});


router.post('/', function(req, res, next) {
    console.log("POST: " + JSON.stringify(orderObj));
    res.json(orderObj);
});

module.exports = router;
