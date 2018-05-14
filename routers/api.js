 const Gdax = require('../service/gdax');
 const runner = require('../service/runner');
 const apiController = require('../controller/api.controller');

APP.post('/api/control', Guard, async (req, res) => {
    await model.Config.update({
        start: req.body.start == 'start'
    }, {
        where: {}
    })
    var responseMessage = '';
    if(req.body.start != 'start') {
        responseMessage='bot was stopped'
    } else {
        runner.start();
        responseMessage= 'bot is running'
    }
    res.json({
        status: 'success',
        message:responseMessage
    })
})

APP.get('/api/balance', Guard, async(req, res) => {
    try {
        var currency = await apiController.getMarket();
        var funds = await apiController.getBalance();
        res.json({
            status: 'success',
            message: {
                funds,
                currency
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'error',
            message: err.toString()
        })
    }
})
APP.get('/api/history', Guard, async(req, res) => {
    var history = await model.History.findAll({
        raw: true,
        limit: 20,
        order: [
            ['time', 'DESC'],
            ['type']
        ]
    })
    res.json({
        status: 'success',
        message: history
    })
})
APP.get('/api/testconnect', Guard, async(req, res) => {
    try {
        var currency = await apiController.getMarket();
        var funds = await apiController.getBalance();
        res.json({
            status: 'success',
            message: {
                funds,
                currency
            }
        })
    } catch(err) {
        res.status(400).json({
            status: 'error',
            message: err.toString()
        })
    }
})
