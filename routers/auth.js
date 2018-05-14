const loginController = require('../controller/login.controller');
APP.get('/login', (req, res) => {
    var isLogin = loginController.checkisLogined(req);
    if(isLogin)  res.redirect('/monitor')
    res.render('login')
})
APP.post('/login', async (req, res) => {
    try {
        var user = await loginController.login(req.body.username, req.body.password)
        if(user) {
            req.session.user = user;
            res.json({
                status: 'success',
                message: 'login completed'
            })
        } 
    } catch(err) {
        res.status(404).json({
            status: 'error',
            message: 'not found this user'
        })
    }
})
APP.get('/logout', Guard, async (req, res) => {
    req.session.destroy();
    res.redirect('/monitor')
})

APP.post('/checkpassword', Guard, async(req, res) => {
    let password = req.body.password;
    if(password == req.session.user.password) {
        res.json({
            status: 'success',
            message: 'password correct'
        })
    } else {
        res.status(400).json({
            status: 'error',
            message: ' password incorrect'
        })
    }
})


APP.post('/changepassword', Guard, async(req, res) => {
    let newpassword = req.body.newpassword;
    let oldpassword = req.body.oldpassword;
    try {
        var response = await model.User.update({
            password: newpassword
        }, {
            where: {
                password: oldpassword
            },
            raw: true
        })
        length = response[0];
        if(length == 0 ) {
            res.status(400).json({
                message: 'not found this usser',
                status: 'error'
            })
            return;
        }
        req.session.user.password = newpassword;
        res.json({
            status: 'success',
            message: ' change password successfully'
        })
    } catch(err) {
        res.status(400).json({
            status:'error',
            message: err.toString()
        })
    }
})
APP.get('/changepassword', Guard, async(req, res) => {
    res.render('changepassword');
})