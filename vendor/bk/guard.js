const loginController = require('../../controller/login.controller');
function Guard(req, res, next) {
    if(!loginController.checkisLogined(req)) {
        res.redirect('/login')
        return;
    } else {
      res.locals.user = req.session.user;
    }
    next();
}
global.Guard = Guard