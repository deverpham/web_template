class Market {
    constructor(market) {
        this.market = market;
    }
    getTradePercent() {
        var percent = (this.market.OpenBuyOrders/ this.market.OpenSellOrders) * 100
        return percent;
    }
}
class BotAnalytic {
    getListMarketCanTrade(markets) {
        markets.map(market => {
            var marketObject = new Market(market);
            var tradePercent = marketObject.getTradePercent();
            if(tradePercent> 80) console.log(market.MarketName)
        })
    }
}
var botAnalytic = new BotAnalytic();
module.exports = botAnalytic;