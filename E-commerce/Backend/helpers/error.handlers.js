export const errrorHandler = (err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        //jwt authorization error
        return res.status(401).json({ message: 'The user is not authorized' });
    }
    if(err.name == 'ValidationError'){
        //validation error
        return res.status(401).json({message: err});
    }
    //default 500 server error
    return res.status(500).json(err);
}