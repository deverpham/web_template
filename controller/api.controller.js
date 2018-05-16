const bittrex = require('../service/bittrex');
const btcPrice = require('../service/btc_update_price');
class API {
    async getBalance() {
        return new Promise(async (resolve, reject) => {
            try {
            var balances = await bittrex.getBalance();
            } catch(err) {
                reject(err)
            }
            var totalBtc = 0;
            Promise.all(balances.map(async balance => {
                return new Promise(async resolve => {
                    
                    if(balance.Currency != 'USDT' && balance.Currency != 'PDC' && balance.Currency !='BTC') {
                        var marketname = `BTC-${balance.Currency}`;
                        var bittrexInformation = await bittrex.getMarketInformation(marketname);
                        totalBtc += (bittrexInformation[0].Last* balance.Balance)
                        resolve();
                    } else if (balance.Currency == 'BTC') {
                        totalBtc+=balance.Balance
                        resolve();
                    } else {
                        resolve();
                    }
                })
            })).then(() => {
                resolve({
                    btc: totalBtc.toFixed(4),
                    usd: btcPrice.btc2USD(totalBtc)
                })
            })
        })
    }
}
var apiController = new API();
module.exports = apiController;