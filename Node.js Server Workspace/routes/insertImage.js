// A router for the insert image feature
var express = require('express');
var router = express.Router();
var serverfunctions = require('./dbms.js');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//POST reciever, insert image
//Note: Coverting images into URL's and inserting photos onto the server
router.post('/', function(req, res, next) {
    
    console.log("recieved insert image request");
    //string to format picture url
    //item id is at end of url after ?
    let loc = window.location.href;
    let split = loc.split('?');
    
    let url1 = new URL('https://www.google.com/drive/') //<--- Insert John Haas Google Drive
    
    var image_URL = url1;
    alert(image_URL.protocol);
    alert(image_URL.host);
    alert(image_URL.pathname);
    var server;
    
    // Send error/result value to client
    function receiveData(error, results){
        res.send(error);
    }
});

//Covert image to URL
function getImageUrl(image_URL) {
    //Set image
    var image_load = document.createElement('image1');
    return;
}
    //Select image
    const img = document.querySelector();
    img.addEventListener('load', function (event ) {
        const image_url1 = getImageUrl(event.currentTarget);
        console.log(image_URL);
    });


module.exports = router;