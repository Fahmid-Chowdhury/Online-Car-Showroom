const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1]; //exp token= Bearer ##@171adw22d@###2
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken
        next();
    }catch(error) {
        return res.status(401).json({
            message: "Please login again to continue",
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}