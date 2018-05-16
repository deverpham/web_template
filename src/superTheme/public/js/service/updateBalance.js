function UpdateBalance() {
    
    $.get('/api/balance', function(data)  {
        $('.symbol').text(data.message.btc)
        $('.amount').text(data.message.usd)
        $('.funds').addClass('animated update')
    })
}
module.exports = UpdateBalance;