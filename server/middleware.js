module.exports = function(opt){
    return function(req, res, next){
        req.RequestStatus='client request begin';
        console.log('application level request received');
        next();
    }

}