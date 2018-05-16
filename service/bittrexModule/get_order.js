const arraySort = require('loopback-filters')
module.exports = function(auth, marketname) {
    return new Promise((resolve, reject) => {
        auth.sendCustomRequest('https://bittrex.com/api/v1.1/account/getorderhistory?market=' + marketname, function(data, err) {
            if(err) {
                console.log(err)
                reject(err)
            }
            else {
                var dataSort = arraySort(data.result, {
                    where: {
                        OrderType: 'LIMIT_BUY' 
                    },
                    order: ['CLosed DESC'],
                    limit: 1
                })
                resolve(dataSort)
            }
        }, true)
    })
}