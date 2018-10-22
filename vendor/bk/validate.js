const validate = require('express-validation');
const joi = require('joi');

const Validation = {
    "/login": {
        "POST": {
            body: {
                "username": joi.string().min(4).required(),
                "password": joi.string().min(6).required()
            }
        }
    }
}


const Routes = Object.keys(Validation);
module.exports = (function() {
    return {
        init: () => {
            Routes.map(route => {
                const methods = Object.keys(Validation[route]);
                methods.map(method => {
                    APP[method.toLowerCase()](route.toLowerCase(), validate(Validation[route][method]))
                })
            })
        }
    }
}())
/*
global.ValidateRoute = function(req, res, next)  {
    let url = req.route.path;
    let method = req.method;
    if(Validation[url][method]) { 
        const validateThisRoute = validate(Validation[url][method])
        return validateThisRoute(req, res, next)
    } else {
        next();
    }
}
*/