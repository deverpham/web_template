
const ProtectMarketModule = require('./protect_market');

async function getMarketHistory(MarketName) {
    var results = await model.Market.findAll({
        where: {
            MarketName
        },
        raw: true,
        limit: 50,
        order: [
          ['TimeStamp', 'DESC']
        ]
    });
    return results;
}
class Market {
    constructor(market) {
        this.market = market;
    }
    getTradePercent() {
        var percent = (this.market.OpenSellOrders - this.market.OpenBuyOrders*3) / this.market.OpenBuyOrders;
        return percent.toFixed(4);
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
            spread = '+' + ((Math.abs(now-last))/last *100).toFixed()
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

    saveLog(markets) {
        markets.map(async market => {
            var marketObject = new Market(market);
            await marketObject.save();
        })
    }
    
    getAImarket(markets) {
      var willHigh = []
      var willLow = []
      markets.map( market => {
          var marketObject  = new Market(market);
          var tradePercent = marketObject.getTradePercent();
          market.percents = tradePercent
          if(tradePercent >0) {
            if(tradePercent <= 4) {
              willHigh.push(market)
            } else {
              willLow.push(market)
            }
          } else {
            willLow.push(market)
          }
      })

      return {
        willLow, willHigh
      }
    }

    onGuardMarket(market) {
        console.log('cancel order', market)
    }

    GuardMarket(MarketName) {
        return new Promise(async resolve => {

            var history = await  getMarketHistory(MarketName)
            if(ProtectMarketModule.checkPersCent(history[0].percent)) {
                console.log('market ok', MarketName)
                resolve()
            } else {
                this.onGuardMarket(MarketName)
                resolve()
            }
        })
    }

    ProtectMarket(markets) {
        return new Promise(resolve => {
            Promise.all(markets.map(async MarketName => this.GuardMarket(MarketName)))
                    .then(() => {
                        resolve();
                    })
        })
    }
}
var botAnalytic = new BotAnalytic();
module.exports = botAnalytic;
