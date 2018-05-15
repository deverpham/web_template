const bittrexModule = require('./bittrex');
var botAnalytic = require('./bot/bot_analytic');
class Bot {
    constructor() {

    }
    async listen() {
        await this.getData();
        setTimeout(async() => {
            await this.listen();
        }, 1000)
    }
    async getData() {
        var listMarket = await bittrexModule.getTopMarket('BTC');
        var freshMarkets = await botAnalytic.getListMarketCanTrade(listMarket);
    }
}
const bot = new Bot();
module.exports = bot;