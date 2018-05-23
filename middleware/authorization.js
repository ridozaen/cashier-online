function isAuthorized(req,res, next){
    if (req.session && req.session.username){
        if (req.session.role === 'admin'){
            return next()
        }else{
            let err = new Error('You must be admin in to view this page.');
            return next(err.message);            
        }
    }else{
        let err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err.message);
    }
}

module.exports = isAuthorized;