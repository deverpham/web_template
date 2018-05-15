class Market {
    constructor(market) {
        this.market = market;
    }
    getTradePercent() {
        var percent = (this.market.OpenBuyOrders*2 - this.market.OpenSellOrders) / this.market.OpenBuyOrders;
        return percent.toFixed(2);
    }
    getSpread() {
        var spread = 0
        var now = this.market.Last
        var last = this.market.PrevDay
        if(now < last) {
            spread = '-'+((Math.abs(now-last))/last *100).toFixed(2)
        } else if(now == last) {
            spread = ((Math.abs(now-last))/last *100).toFixed(2)
        } else {
            spread = '+' + ((Math.abs(now-last))/last *100).toFixed(2)
        }
        return spread;
    }
    async save() {
        var percent = this.getTradePercent();
        var spread = this.getSpread();
        await model.Market.create(Object.assign(this.market, {
            percent,
            spread
        }));
    }
}
class BotAnalytic {
    getListMarketCanTrade(markets) {
        markets.map(async market => {
            var marketObject = new Market(market);
            await marketObject.save();
            var tradePercent = marketObject.getTradePercent();
            if(tradePercent > 0) {
                //GIA SE GIAM
                //console.log(market.MarketName, tradePercent)
            } else {
                if(Math.abs(tradePercent) <= 0.7) {
                    // HEN XUI
                    //console.log(market.MarketName, tradePercent)
                } else {
                    // GIA SE TANG
                    console.log(market.MarketName, tradePercent)
                }
                
            }
            
        })
    }
}
var botAnalytic = new BotAnalytic();
module.exports = botAnalytic;