const bittrex = require('node-bittrex-api');
const getConfig = require('../middleware/getconfig');
const getTopHighVolumeMarket = require('./bittrexModule/get_top_market').getTopHighVolumeMarket;
const getBalance = require('./bittrexModule/get_balance');
const getMarket = require('./bittrexModule/get_market');
const getOrder = require('./bittrexModule/get_order');
class BittrexMiddleware {
    async getAuth() {
        var config = await getConfig();
        bittrex.options({
            'apikey': config.key,
            'apisecret': config.secret
        })
        return bittrex;
    }
    async getTopMarket(marketCurrency) {
        var auth = await this.getAuth();
        try {
            var markets = await getTopHighVolumeMarket(auth, marketCurrency,20);
            return markets;
        } catch(err) {
            throw err;
        }
        
    }
    async getBalance() {
        var auth = await this.getAuth();
        var balance = await getBalance(auth);
        return balance;
    }
    async getLiveMarket() {
        var balance = await this.getBalance();
        const FILTER_ERROR_CURRENCY = ['PDC', 'BTC', 'USDT'];
        var myMarket =  balance.filter(record => FILTER_ERROR_CURRENCY.indexOf(record.Currency) == -1);
        return myMarket
    }
    async getMarketInformation(marketname) {
        var auth = await this.getAuth();
        var marketInformation = await getMarket(auth, marketname);
        return marketInformation;
    }
    async getMarketOrder(MarketName) {
        var auth = await this.getAuth();
        var historyOrder = await getOrder(auth, MarketName);
        return historyOrder;
    }
}
var bittrexModule = new BittrexMiddleware();
module.exports =bittrexModule;