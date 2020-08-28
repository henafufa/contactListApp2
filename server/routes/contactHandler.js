//require nodejs modules
var express= require('express');
var router= express.Router();

//requirecreated modules
var dbConnection=require('../dbconnection');
var contactModel= require('../models/contactSchema');
//mock data
var storedData = [];

//router level middleware
router.use(function(req, res, next){
    req.initialRequest='request requested to this routes handler';
    console.log('request to contactHandler');
    next();
});

//check database connection
var checkDb =function(req, res, next){
    if(dbConnection.isConnected){
        console.log('we get database acccess');
        next();
    }
}
router.use(checkDb);

var idChecker=function(req,res, next){
    if(req.params.id === '0'){
        next('router');
    }
    else{
        console.log(req.params.id);
        next();
    }
}

router.get('/getContact', function(req,res){
    console.log('get contact request accepted ');
    contactModel.find({}).then((doc)=>{
        console.log('fetched data:', doc);
        storedData = doc;
        console.log('1-after fetch:', storedData);
         res.json(storedData);
    }).catch((err)=>{
        console.log('error:', err);
    });
});

router.post('/addContact', function(req,res){
    console.log('entered data', req.body);
    storedData.push(req.body);
    let storedContact = new contactModel(req.body);
    storedContact.save().then((doc)=>{
        console.log('data entered into database successfully');
    }).catch((err)=>{
        console.log('data not entered');
    });
    res.send('contact saved successfully');
});

//appliying router.route();
router.route('/user/:id').get(idChecker,(req,res, next)=>{
    console.log('get id greater than 1:', req.params.id);
    res.send(req.params.id);
}).post(idChecker,(req,res, next)=>{
    console.log('post id greater than 1:', req.params.id);
    res.send(req.params.id);
});
router.get('/user/:id',(req,res)=>{
    console.log('next(router) applied for get request');
    res.send('next router applied');
});

module.exports= router ;