const Gdax = require('./gdax');
const apiController = require('../controller/api.controller');
const toFixDown = require('../helpers/tofixdown');
class Runner { 

    async takerTask (config) {
        var funds = await apiController.getBalance();
        if(config.side == 'buy') funds = toFixDown(funds, 2)
        else funds = toFixDown(funds, 4) 
        if(funds > 0) {
            response = {};
            try {
                var response = await Gdax.placeOrder(funds, config.market, config.side, config.type);
            } catch(err) {
                console.log(err.toString())
            }
            if('status' in response) {
                await model.History.create({
                    size: response.size || response.funds,
                    market: response.product_id,
                    time: response.created_at,
                    side: response.side,
                    type: config.type
                })
            } else {
                console.log(`Can't make order`, response.status)
            }

        } else {
            console.log('not have funds')
        }
    }

    async makerTask(config) {
            var isChange = await Gdax.checkPriceChange();
            console.log(isChange)
            if(isChange) {
                await Gdax.CancelAllOrder();
                console.log('cancel all order')
                var funds = await apiController.getBalance();
                if(config.side == 'buy') funds = toFixDown(funds, 2)
                else funds = toFixDown(funds, 4) 
                if(funds > 0) {
                    response = {};
                    try {
                        var response = await Gdax.placeOrder(funds, config.market, config.side, config.type, config.extracents);
                    } catch(err) {
                        console.log(err.toString())
                    }
                    if('status' in response) {
                        await model.History.create({
                            size: response.size || response.funds,
                            market: response.product_id,
                            time: response.created_at,
                            side: response.side,
                            type: config.type
                        })
                    } else {
                        console.log(`Can't make order`, response.status)
                    }

                } else {
                    console.log('not have funds')
                }
        }
    }

    start() {

        var Cron = async () => {
            console.log('starting script')
            var config = await model.Config.findOne({
                raw:true
            })
            if(config.start ) {
                if(config.type == 'taker') {
                    await this.takerTask(config)
                    
                } else {
                    await this.makerTask(config)
                }
                setTimeout(() => {

                    Cron();
                }, config.time * 1000)
            } else {
                console.log('bot was stop')
            }
        }
        Cron();
    }
}
var runner = new Runner();

module.exports = runner;
