const getOrder = require('./get_order');
function SellLimit(auth, MarketName, Quantity, Rate) {
    return new Promise((resolve, reject) => {
        auth.tradesell({
            MarketName,
            OrderType: 'LIMIT',
            Quantity,
            Rate
        }, function(data, err) {
            if(err) reject(err) 
            else {
                resolve(data.result)
            }
        })
    })
}
function BuyLimit(auth, MarketName, Quantity, Rate) {
    return new Promise((resolve, reject) => {
        auth.tradebuy({
            MarketName,
            OrderType: 'LIMIT',
            Quantity,
            Rate
        }, function(data, err) {
            if(err) reject(err) 
            else {
                resolve(data.result)
            }
        })
    })
}
function cancelOrder(auth, orderid) {
    return new Promise((resolve, reject) =>{
        auth.sendCustomRequest(`https://bittrex.com/api/v1.1/market/cancel?uuuid=${orderid}`, function(data, err) {
            if(err) reject(err) 
            else {
                resolve(data.result)
            }
        }, true) 
    })
}
function CancelAllOrder(auth, MarketName) {
    return new Promise(async (resolve, reject) => {
        var orders = getOrder(auth, MarketName);
        Promise.all(orders.map(order => cancelOrder(auth, order.uuid)))
            .then(() => {
                resolve()
            })
            .catch(err => reject(err))
    })
}