//require nodejs modules
var express= require('express');
var app= express();
var bodyParser= require('body-parser');
var path= require('path');

//require created modules
var contactRouter= require('./server/routes/contactHandler');
var configurableMiddleware= require('./server/middleware');

//declare constants
const PORTNUM= 3000;
const INDEXPAGE_URL='/public/index.html';
const ERRORPAGE_URL='/public/error.html';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(configurableMiddleware({opt:1}));

//add request time property as application level middleware
function requestTime(req,res, next){
    req.reqTime= Date.now();
    console.log('application level middleware executed',req.reqTime);
    next();
}
function requestInfo(req, res, next){
    req.requestType= Date.UTC().toString();
    console.log('application level middleware executed', req.requestType);
    next();
}
var notPageFoundError= function(err, req, res, next){
    if(err) console.error(err);
    else   next();
}
var requestAddedProperty=[requestTime,requestInfo];

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + INDEXPAGE_URL));
});

app.use('/api', contactRouter);

app.get('/Middle',requestAddedProperty,function(req,res, next){
    console.log('requestTime:', req.reqTime);
    next();
});

app.get('*',notPageFoundError,function(req,res){
    res.sendFile(path.join(__dirname + ERRORPAGE_URL));
});

app.listen(PORTNUM, ()=>{
    console.log('the server running on ', PORTNUM);
});