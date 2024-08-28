const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

module.exports = (...roles) => {
    
    return (req, res, next) => {
        
        if (!roles.includes(req.user.role)) {
            
            const error = appError.create('this role is not have a permision', 403, httpStatusText.FAIL);
            return next(error);

        }
        next();
    }
};