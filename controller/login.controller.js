class LoginController {
    checkisLogined(req) {
        if('user' in req.session) {
            return true;
        }
        return false;
    }
    login(username, password) {
        return new Promise(async (resolve, reject) => {
           var user = await model.User.findOne({
               where: {
                username,
                password
            },
            raw: true
           })
            if(user) {
                resolve(user);
            } else {
                reject()
            }
        })
    }
}
var loginController = new LoginController();
module.exports = loginController;
