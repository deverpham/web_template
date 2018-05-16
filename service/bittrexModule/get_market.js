module.exports = (auth, marketname) => {
    return new Promise((resolve, reject) => {
        auth.getmarketsummary({market: marketname}, function(data, err) {
            if(err) {
                reject(err)
            }
            else {
                resolve(data.result)
            }
        })
    })
}