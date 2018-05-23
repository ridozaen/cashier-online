function isAuthenticated(req,res, next){
    if (req.session && req.session.username){
        return next()
    }else{
        let err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err.message);
    }
}

module.exports = isAuthenticated;