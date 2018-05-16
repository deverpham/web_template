const arraySort = require('loopback-filters')
module.exports = function(auth) {
    return new Promise((resolve, reject) => {
        auth.getbalances( function(data , err) {
            if(err) reject(err)
            else {
                var dataSort = arraySort(data.result, {
                    where:  {
                        Balance: {
                            gt: 0
                        }
                    }
                })
                resolve (dataSort)
            }
        })
    })
}