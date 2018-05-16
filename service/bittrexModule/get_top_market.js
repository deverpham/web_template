const arraySort = require('loopback-filters')
function getTopMarket(bittrex) {
    return new Promise((resolve, reject) => {
        bittrex.getmarketsummaries(function(data, err) {
            if(err) reject(err)
            else {
                resolve(data.result)

            }
        })
    })
}
async function getTopHighVolumeMarket(bittrex, market, numberRecords) {
    try {
    var markets = await getTopMarket(bittrex);
    } catch(err) {
        console.log('err in getTopHighVolumeMarket')
        throw err
    }
    var dataSort = arraySort(markets, {
        where: {
            MarketName : {
                like: `${market}- *`
            }
        },
        order: ['BaseVolume DESC'],
        limit : numberRecords
    });
    return dataSort;
}
module.exports = {
    getTopMarket,
    getTopHighVolumeMarket
}