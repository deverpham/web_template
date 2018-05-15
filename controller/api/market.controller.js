const bittrexModule = require('../../service/bittrex');
const btcPrice = require('../../service/btc_update_price');
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
}
const marketController = new MarketController();
module.exports = marketController;