var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// const async = require('async');
// const request = require('request');



 


//  function httpGet(url, callback) {
//   const options = {
//     url :  url,
//     json : true,
 
      
//   };
  
//   request(options,
//     function(err, res, body) {
//       callback(err, body);
//     }
//   );
// }


// const urls= [
// "https://full.findandfound.ga/api/info.php?site=shutterstock&id=1108337222",
// "https://full.findandfound.ga/api/info.php?site=shutterstock&id=1108337222"

//     //   "",
// //   ""
// ];

// async.map(urls, httpGet, function (err, res){
//   if (err) return console.log(err);
//   console.log(res);
// });