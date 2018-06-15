const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
module.exports = function(req, res, next){
    try {
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(req.body.token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: error
        });
        next();
    }

}