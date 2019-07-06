var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route -> index
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    //express callback response by calling burger.selectAllBurger
    burger.all(function(data) {
        //wrapper for orm.js that using MySQL query callback will return data, render to index with handlebar
        res.render('index', { data });
    });
});

//post route -> back to index
router.post('/burgers/create', function(req, res) {
    if (req.body.burger_name == '') {
        console.log('No burger name entered');
        res.redirect('/');
    } else {
        //takes the request object using it as input for buger.addBurger
        burger.create(req.body.burger_name, function(result) {
            //wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
            console.log(result);
            res.redirect('/');
        });
    }
});

//put route -> back to index
router.put('/burgers/update', function(req, res) {
    burger.update(req.body.id, function(result) {
        //wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
        console.log(result);
        res.redirect('/');
    });
});

module.exports = router;