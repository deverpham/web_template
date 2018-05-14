const loginController = require('../controller/login.controller');
APP.get('/monitor/config', Guard, async (req, res) => {
    
    config = await model.Config.findOne({
        raw: true
    });
    res.render('config', {
        title: 'Config Bot',
        config
    });
})
APP.post('/monitor/config', Guard, async(req, res) => {
    const update = await model.Config.update(req.body, {
        where: {}
    });
    res.redirect('/monitor/config')
})
APP.get('/monitor', Guard, async(req, res) => {
    config = await model.Config.findOne({
        raw: true
    });
    res.render('monitor', {
        title: 'Monitor',
        config
    })
})
APP.get('/',Guard, (req, res) => {
    res.redirect('/monitor');
})