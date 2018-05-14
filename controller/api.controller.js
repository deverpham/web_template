const Gdax = require('../service/gdax.js');
class API {
    async getMarket() {
        var config = await model.Config.findOne({
            raw: true
        });
        var currencies = config.market.split('-');
        var currency = null;
        if(config.side == 'sell') currency = currencies[0];
        else currency = currencies[1];
        return currency;
    }
    async getBalance() {
        
        var balances = await Gdax.getBalance();
        var market = await this.getMarket();
        var currency = -1;
        balances.map(balance => {
            if(balance.currency == market) {
                currency = balance.available
                return currency;
            }
        })
        return currency;
    }
}
var apiController = new API();
module.exports = apiController;