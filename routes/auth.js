var express = require('express');
var router = express.Router();
var authModel = require('../models/auth-model');
var bcryptjs = require('bcryptjs');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var db = require('../db');
var nodemailer = require("nodemailer");
var http = require('http');
const request = require('request-promise');
const async = require('async');
const fetch = require("node-fetch");
const { response } = require('express');




router.post('/insert_urls', function(req, res) {




    for (var value in req.body) {
        var value = req.body[value];
        console.log(value);
    }





    function httpGet(url, callback) {
        const options = {
            url: url + '&key=JZVREcjYOUC6eQlJiTxWkwNQDBsqgz',
            json: true,


        };

        return new Promise(function(resolve, reject) {
            request(options, function(err, res, body) {
                callback(err, body);

                for (var value in body) {
                    var value = body[value];
                    // console.log(value);
                }
                let arr = []
                arr.push(body)

                resolve(body)

                Promise.all(arr).then((data) => {
                    { res.json(arr); }
                });



            });

        })

    }






    // const urls = [
    //     "https://full.findandfound.ga/api/info.php?site=shutterstock&id=1108337222",
    //     "https://full.findandfound.ga/api/info.php?site=shutterstock&id=1108337222"

    //     //   "",
    //     //   ""
    // ];



    async.map(value, httpGet, function(err, res, ) {

    })









});






router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    console.log(user)
    sendMail(user, info => {
        console.log("the mail has been send ");
        res.send(info);
    });
});

async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "karanvermalts31@gmail.com",
            pass: "9319211887"
        }
    });

    let mailOptions = {
        from: '"fun of jnbjh"',
        to: "karanvermalts31@gmail.com",
        subject: "welcome ",
        html: `<h1>hi....</h1>`
    };

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}

router.post('/signup', function(req, res) {
    const password = req.body.password;
    const saltRounds = 10;
    bcryptjs.hash(password, saltRounds, function(err, hash) {
        req.body.password = hash;
        authModel.signup(req.body, function(err, result) {
            res.json({ data: result, error: err })
        });
    });
});



router.post('/test_report', function(req, res) {
    console.log(req.body.date1);
    console.log(req.body.company_name);

     
    let sql = "SELECT * FROM test_report where company_name='" + req.body.company_name + "'and area = '" + req.body.date1 + "'";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.put('/update_report', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `test_report` SET `location` = '" + req.body.location + "',`unit` = '" + req.body.unit + "',`l_max` = '" + req.body.l_max + "', `l_min` = '" + req.body.l_min + "',`l_eq` = '" + req.body.l_eq + "',`company_name` = '" + req.body.company_name + "',`area` = '" + req.body.area + "' WHERE `test_report`.`id` = " + req.body.id + ";";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});

router.put('/update_above_noise', function(req, res) {
    console.log(req.body.company_name);
    //  
     
    let sql = "UPDATE `noise_detail` SET `capacity` = '.',`issue_date`='" + req.body.issue_date + "',`sample_date`='" + req.body.sample_date + "',`report_no`='" + req.body.report_no + "',`request_no`='" + req.body.request_no + "',`sample_drawn`='" + req.body.sample_drawn + "',`sample_no`='" + req.body.sample_no + "',`protocol`='" + req.body.protocol + "',`area`='" + req.body.area + "',`company_name`='" + req.body.company_name + "',`issue_to`='" + req.body.issue_to + "',`request_date`='" + req.body.request_date + "',`sample_particular`='" + req.body.sample_particular + "',`sample_description`='" + req.body.sample_description + "' WHERE `noise_detail`.`id` = " + req.body.id + ";;";  
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.put('/update_above_water', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `water_above_details` SET `capacity` ='" + req.body.capacity + "',`issue_date`='" + req.body.issue_date + "',`sample_date`='" + req.body.sample_date + "',`report_no`='" + req.body.report_no + "',`request_no`='" + req.body.request_no + "',`sample_drawn`='" + req.body.sample_drawn + "',`sample_no`='" + req.body.sample_no + "',`protocol`='" + req.body.protocol + "',`area`='" + req.body.area + "',`company_name`='" + req.body.company_name + "',`issue_to`='" + req.body.issue_to + "',`request_date`='" + req.body.request_date + "',`sample_particular`='" + req.body.sample_particular + "',`sample_description`='" + req.body.sample_description + "',`sample_description`='" + req.body.sample_description + "' WHERE `water_above_details`.`id` = " + req.body.id + ";";
    let query = db.query(sql, (err, results) => {

        if (err) {
            throw err;
        }
        res.send(results);
    });
});      
router.put('/update_above_light', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `light_above_details` SET `capacity` ='" + req.body.capacity + "',`issue_date`='" + req.body.issue_date + "',`sample_date`='" + req.body.sample_date + "',`report_no`='" + req.body.report_no + "',`request_no`='" + req.body.request_no + "',`sample_drawn`='" + req.body.sample_drawn + "',`sample_no`='" + req.body.sample_no + "',`protocol`='" + req.body.protocol + "',`area`='" + req.body.area + "',`company_name`='" + req.body.company_name + "',`issue_to`='" + req.body.issue_to + "',`request_date`='" + req.body.request_date + "',`sample_particular`='" + req.body.sample_particular + "',`sample_description`='" + req.body.sample_description + "',`sample_description`='" + req.body.sample_description + "' WHERE `noise_detail`.`id` = " + req.body.id + ";";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});

router.put('/update_report_water', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `test_water_report` SET `parameters` = '" + req.body.parameters + "',`test_method` = '" + req.body.test_method + "',`results` = '" + req.body.results + "', `units` = '" + req.body.units + "',`desirable` = '" + req.body.desirable + "',`permissible` = '" + req.body.permissible + "',`max_limit` = '" + req.body.max_limit + "',`company_name` = '" + req.body.company_name + "',`area` = '" + req.body.area + "' WHERE `test_water_report`.`id` = " + req.body.id + ";";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.put('/update_report_light', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `test_light_report` SET `location` = '" + req.body.location + "',`unit` = '" + req.body.unit + "',`inspection_area` = '" + req.body.inspection_area + "', `normal_area` = '" + req.body.normal_area + "',`lux` = '" + req.body.lux + "',`company_name` = '" + req.body.company_name + "',`area` = '" + req.body.area + "' WHERE `test_light_report`.`id` = " + req.body.id + ";";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.put('/update_above_light', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `light_above_details` SET `capacity` ='" + req.body.capacity + "',`issue_date`='" + req.body.issue_date + "',`sample_date`='" + req.body.sample_date + "',`report_no`='" + req.body.report_no + "',`request_no`='" + req.body.request_no + "',`sample_drawn`='" + req.body.sample_drawn + "',`sample_no`='" + req.body.sample_no + "',`protocol`='" + req.body.protocol + "',`area`='" + req.body.area + "',`company_name`='" + req.body.company_name + "',`issue_to`='" + req.body.issue_to + "',`request_date`='" + req.body.request_date + "',`sample_particular`='" + req.body.sample_particular + "',`sample_description`='" + req.body.sample_description + "',`sample_description`='" + req.body.sample_description + "' WHERE `light_above_details`.`id` = " + req.body.id + ";";
    let query = db.query(sql, (err, results) => {


        res.send(results);
    });
});

router.put('/update_report_second', function(req, res) {
    console.log(req.body.company_name);

     
    let sql = "UPDATE `test_result_noise` SET `date_of_sampling` = '" + req.body.date_of_sampling + "',`name_of_plant` = '" + req.body.name_of_plant + "',`emission_source_monitored` = '" + req.body.emission_source_monitored + "', `stack_details` = '" + req.body.stack_details + "',`location_of_sampling_point` = '" + req.body.location_of_sampling_point + "',`type_of_chimney` = '" + req.body.type_of_chimney + "',`from_source_of_emission` = '" + req.body.from_source_of_emission + "',`from_roof_level` = '" + req.body.from_roof_level + "',`from_ground_level`='" + req.body.from_ground_level + "',`diameter_of_stack`='" + req.body.diameter_of_stack + "',`sampling_duration`='" + req.body.sampling_duration + "',`parameters_tested`='" + req.body.parameters_tested + "',`monitoring_purpose`='" + req.body.monitoring_purpose + "',`product_manufactured`='" + req.body.product_manufactured + "',`control_measures`='" + req.body.control_measures + "',`material_recovery`='" + req.body.material_recovery + "', `fugitive_emission`='" + req.body.fugitive_emission + "',`general_observation`='" + req.body.general_observation + "', `stack_temp`='" + req.body.stack_temp + "', `ambient_temp`='" + req.body.ambient_temp + "', `avg_stack_vel`='" + req.body.avg_stack_vel + "',`qant_of_emission`='" + req.body.qant_of_emission + "',`qant_of_emission`='" + req.body.qant_of_emission + "',`sampling_started`='" + req.body.sampling_started + "', `average_flowrate`='" + req.body.average_flowrate + "',`sampling_completed`='" + req.body.sampling_completed + "',`vol_air_sampled`='" + req.body.vol_air_sampled + "',`flowrate_of_gases`='" + req.body.flowrate_of_gases + "',`company_name`='" + req.body.company_name + "'   WHERE `test_result_noise`.`id` = " + req.body.id + ";";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.post('/test_noise_report', function(req, res) {
    console.log(req.body.date1);
    console.log(req.body.company_name);

     
    let sql = "SELECT * FROM test_result_noise where company_name='" + req.body.company_name + "' and name_of_plant = '" + req.body.date1 + "' ";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        res.send(results);
    });  
});
router.post('/noise_details', function(req, res) {


     
    let sql = "SELECT * FROM test_report where area='" + req.body.date1 + "' and company_name='" + req.body.company_name + "' ";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});  
router.post('/noise_detailss', function(req, res) {


     
    let sql = "SELECT * FROM noise_detail where area='" + req.body.date1 + "' and company_name='" + req.body.company_name + "' ";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});

  
router.post('/water_above_details', function(req, res) {


     
    let sql = "SELECT * FROM water_above_details where area='" + req.body.date1 + "' and company_name='" + req.body.company_name + "' ";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});      
router.post('/light_above_details', function(req, res) {


     
    let sql = "SELECT * FROM light_above_details where area='" + req.body.date1 + "' and company_name='" + req.body.company_name + "' ";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});


router.post('/light_details', function(req, res) {


     
    let sql = "SELECT * FROM test_light_report";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});
router.post('/water_details', function(req, res) {


     
    let sql = "SELECT * FROM test_water_report";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});



router.post('/noise_details_second', function(req, res) {


     
    let sql = "SELECT * FROM test_result_noise";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);
    });  
});

router.delete('/delete_noise/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `test_report` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});


router.delete('/delete_all_noise_details/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `noise_detail` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});      
router.delete('/delete_all_light_details/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `light_above_details` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});


router.delete('/delete_all_water_details/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `water_above_details` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});



router.delete('/delete_light/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `test_light_report` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});

router.delete('/delete_water/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `test_water_report` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});


router.delete('/delete_noise_second/:id', function(req, res) {

    console.log("params" + req.params.id); 
    let sql = "DELETE FROM `test_result_noise` WHERE id=" + req.params.id + "";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        //  res.send(results);
    });  
});

router.post('/test_light_report', function(req, res) {
    console.log(req.body.date1);
    console.log(req.body.company_name);

     
    let sql = "SELECT * FROM test_light_report where company_name='" + req.body.company_name + "' and area= '" + req.body.date1 + "'";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        res.send(results);
    });  
});

router.post('/test_water_report', function(req, res) {
    console.log(req.body.date1);
    console.log(req.body.company_name);

     
    let sql = "SELECT * FROM test_water_report where company_name='" + req.body.company_name + "' and area= '" + req.body.date1 + "'";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        //    console.log(results)
        res.send(results);
    });  
});



router.post('/search', (req, res) => {


      
    let sql = "SELECT * FROM city where city='" + req.body.city + "'";

      
    let query = db.query(sql, (err, results) => {
        console.log(results[0].city)    
            // if (err) throw err;
            // res.send(results);

          
    });
});




router.get('/noise_all_details', (req, res) => {


      
    let sql = "SELECT * FROM noise_detail";

      
    let query = db.query(sql, (err, results) => {
        console.log(results[0].city)    
        if (err) throw err;
        res.send(results);

          
    });
});


router.get('/water_all_details', (req, res) => {


      
    let sql = "SELECT * FROM water_above_details";

      
    let query = db.query(sql, (err, results) => {
        console.log(results[0].city)    
        if (err) throw err;
        res.send(results);

          
    });
});


router.get('/light_all_details', (req, res) => {


      
    let sql = "SELECT * FROM light_above_details";

      
    let query = db.query(sql, (err, results) => {
        console.log(results[0].city)    
        if (err) throw err;
        res.send(results);

          
    });
});
router.post('/insert_report', (req, res) => {


      
    let sql = "INSERT INTO `test_report` ( `location`, `unit`, `l_max`, `l_min`, `l_eq`, `company_name`,`area`) VALUES ( '" + req.body.location + "', '" + req.body.unit + "', '" + req.body.l_max + "', '" + req.body.l_min + "', '" + req.body.l_eq + "', '" + req.body.company_name + "', '" + req.body.area + "');";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);

          
    });
});

router.post('/insert_noise_report', (req, res) => {

    //  let sql = "INSERT INTO `test_report` ( `location`, `unit`, `l_max`, `l_min`, `l_eq`, `company_name`,`area`) VALUES ( '"+req.body.location+"', '"+req.body.unit+"', '"+req.body.l_max+"', '"+req.body.l_min+"', '"+req.body.l_eq+"', '"+req.body.company_name+"', '"+req.body.area+"');";

    let sql = "INSERT INTO `noise_detail` (`capacity`, `issue_date`, `sample_date`, `report_no`, `request_no`, `sample_drawn`, `sample_no`, `protocol`, `area`, `company_name`, `issue_to`, `request_date`, `sample_particular`, `sample_description`, `date_of_testing`) VALUES ('" + req.body.capacity + "', '" + req.body.issue_date + "', '" + req.body.sample_date + "', '" + req.body.report_no + "', '" + req.body.request_no + "', '" + req.body.sample_drawn + "', '" + req.body.sample_no + "', '" + req.body.protocol + "', '" + req.body.area + "','" + req.body.company_name + "','" + req.body.issue_to + "','" + req.body.request_date + "','" + req.body.sample_particular + "','" + req.body.sample_description + "','" + req.body.date_of_testing + "');";

    let query = db.query(sql, (err, results) => {

        if (err) throw err;
        res.send(results);

    });
})


router.post('/insert_water_above', (req, res) => {

    //  let sql = "INSERT INTO `test_report` ( `location`, `unit`, `l_max`, `l_min`, `l_eq`, `company_name`,`area`) VALUES ( '"+req.body.location+"', '"+req.body.unit+"', '"+req.body.l_max+"', '"+req.body.l_min+"', '"+req.body.l_eq+"', '"+req.body.company_name+"', '"+req.body.area+"');";

    let sql = "INSERT INTO `water_above_details` (`capacity`, `issue_date`, `sample_date`, `report_no`, `request_no`, `sample_drawn`, `sample_no`, `protocol`, `area`, `company_name`, `issue_to`, `request_date`, `sample_particular`, `sample_description`, `date_of_testing`) VALUES ('" + req.body.capacity + "', '" + req.body.issue_date + "', '" + req.body.sample_date + "', '" + req.body.report_no + "', '" + req.body.request_no + "', '" + req.body.sample_drawn + "', '" + req.body.sample_no + "', '" + req.body.protocol + "', '" + req.body.area + "','" + req.body.company_name + "','" + req.body.issue_to + "','" + req.body.request_date + "','" + req.body.sample_particular + "','" + req.body.sample_description + "','" + req.body.date_of_testing + "');";

    let query = db.query(sql, (err, results) => {

        if (err) throw err;
        res.send(results);

    });
})



router.post('/insert_light_above', (req, res) => {

    //  let sql = "INSERT INTO `test_report` ( `location`, `unit`, `l_max`, `l_min`, `l_eq`, `company_name`,`area`) VALUES ( '"+req.body.location+"', '"+req.body.unit+"', '"+req.body.l_max+"', '"+req.body.l_min+"', '"+req.body.l_eq+"', '"+req.body.company_name+"', '"+req.body.area+"');";

    let sql = "INSERT INTO `light_above_details` (`capacity`, `issue_date`, `sample_date`, `report_no`, `request_no`, `sample_drawn`, `sample_no`, `protocol`, `area`, `company_name`, `issue_to`, `request_date`, `sample_particular`, `sample_description`, `date_of_testing`) VALUES ('" + req.body.capacity + "', '" + req.body.issue_date + "', '" + req.body.sample_date + "', '" + req.body.report_no + "', '" + req.body.request_no + "', '" + req.body.sample_drawn + "', '" + req.body.sample_no + "', '" + req.body.protocol + "', '" + req.body.area + "','" + req.body.company_name + "','" + req.body.issue_to + "','" + req.body.request_date + "','" + req.body.sample_particular + "','" + req.body.sample_description + "','" + req.body.date_of_testing + "');";

    let query = db.query(sql, (err, results) => {

        if (err) throw err;
        res.send(results);

    });
})

router.post('/insert_report_noise', (req, res) => {


      
    let sql = "INSERT INTO `test_result_noise` (`date_of_sampling`, `name_of_plant`, `emission_source_monitored`, `stack_details`, `location_of_sampling_point`, `type_of_chimney`, `from_source_of_emission`, `from_roof_level`, `from_ground_level`, `diameter_of_stack`, `sampling_duration`, `parameters_tested`, `monitoring_purpose`, `product_manufactured`, `control_measures`, `material_recovery`, `fugitive_emission`, `general_observation`, `stack_temp`, `ambient_temp`, `avg_stack_vel`, `qant_of_emission`, `company_name`, `sampling_started`, `sampling_completed`, `average_flowrate`, `vol_air_sampled`, `flowrate_of_gases`) VALUES ('" + req.body.date_of_sampling + "', '" + req.body.name_of_plant + "', '" + req.body.emission_source_monitored + "', '" + req.body.stack_details + "', '" + req.body.location_of_sampling_point + "', '" + req.body.type_of_chimney + "', '" + req.body.from_source_of_emission + "', '" + req.body.from_roof_level + "', '" + req.body.from_ground_level + "', '" + req.body.diameter_of_stack + "', '" + req.body.sampling_duration + "', '" + req.body.parameters_tested + "', '" + req.body.monitoring_purpose + "', '" + req.body.product_manufactured + "', '" + req.body.control_measures + "', '" + req.body.material_recovery + "', '" + req.body.fugitive_emission + "', '" + req.body.general_observation + "', '" + req.body.stack_temp + "', '" + req.body.ambient_temp + "', '" + req.body.avg_stack_vel + "', '" + req.body.qant_of_emission + "', '" + req.body.company_name + "', '" + req.body.sampling_started + "', '" + req.body.sampling_completed + "', '" + req.body.average_flowrate + "', '" + req.body.vol_air_sampled + "', '" + req.body.flowrate_of_gases + "');";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);

          
    });
});

router.post('/insert_report_light', (req, res) => {


      
    let sql = "INSERT INTO `test_light_report` (`location`, `unit`, `inspection_area`, `normal_area`, `lux`, `company_name`, `area`) VALUES ('" + req.body.location + "', '" + req.body.unit + "', '" + req.body.inspection_area + "', '" + req.body.normal_area + "', '" + req.body.lux + "', '" + req.body.company_name + "', '" + req.body.area + "');";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);

          
    });
});

router.post('/insert_report_water', (req, res) => {


      
    let sql = "INSERT INTO `test_water_report` (`parameters`, `test_method`, `results`, `units`, `desirable`, `permissible`, `max_limit`,`company_name`,`area`) VALUES ('" + req.body.parameters + "', '" + req.body.test_method + "', '" + req.body.results + "', '" + req.body.units + "', '" + req.body.desirable + "', '" + req.body.permissible + "', '" + req.body.max_limit + "','" + req.body.company_name + "','" + req.body.area + "');";

      
    let query = db.query(sql, (err, results) => {

            
        if (err) throw err;
        res.send(results);

          
    });
});






router.post('/login', function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {

        if (err) { return next(err); }

        if (!user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'secret123', options);

        res.json({ token });

    })(req, res, next);
})

module.exports = router;