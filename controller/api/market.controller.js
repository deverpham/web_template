const bittrexModule = require('../../service/bittrex');
const btcPrice = require('../../service/btc_update_price');
const botAnalytic = require('../../service/bot/bot_analytic');
function cal(now, last) {
    if(now < last) {
        return `Đang Giảm - ${((Math.abs(now-last))/last *100).toFixed(2)} %`
    } else if(now == last) {
        return "Giữ Nguyên"
    } else {
        return `Đang Tăng + ${((Math.abs(now-last))/last *100).toFixed(2)} % `
    }
}
function getUsdPrice(record) {
    const replacePrice = {
        Ask: btcPrice.btc2USD(record.Ask),
        Bid: btcPrice.btc2USD(record.Bid),
        High: btcPrice.btc2USD(record.High),
        Low: btcPrice.btc2USD(record.Low),
        Last: btcPrice.btc2USD(record.Last),
        PrevDay: btcPrice.btc2USD(record.PrevDay),
        NhanXet: cal(record.Last, record.PrevDay)
    }
    return replacePrice
}
class MarketController {
    async get10BtcHighVolume() {
      const results =  await bittrexModule.getTopMarket('BTC')
      return results.map(record => Object.assign(record, getUsdPrice(record)));
    }

    async getMarketHistory(MarketName) {
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

    async getAImarket() {
      var listMarket = await bittrexModule.getTopMarket('BTC');
      var results  =  botAnalytic.getAImarket(listMarket);

      return {
        willHigh: results.willHigh.map(record =>Object.assign(record, getUsdPrice(record))),
        willLow: results.willLow.map(record =>Object.assign(record, getUsdPrice(record)))
      }
    }
    async processMyMarketItemOrder(record) {
        return new Promise(async resolve => {
            var  MarketName = `BTC-${record.Currency}`;
            var  historyOrder = await bittrexModule.getMarketOrder(MarketName);
            var  marketNow = await bittrexModule.getMarketInformation(MarketName);
            var prettyObject = {
                MarketName,
                Last: marketNow[0].Last,
                BuyPrice: historyOrder[0].PricePerUnit,
                btc: (marketNow[0].Last* record.Balance).toFixed(8),
                usd: btcPrice.btc2USD(marketNow[0].Last* record.Balance)
            }
            resolve(prettyObject)
        })
    }
    async getMyMarket() {
        return new Promise(async resolve => {
            var myMarket = await bittrexModule.getLiveMarket();
            Promise.all(myMarket.map(record => this.processMyMarketItemOrder(record))).then(results => {
                resolve(results)
            })
        })
    }
}
const marketController = new MarketController();
module.exports = marketController;
