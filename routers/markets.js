APP.get('/markets', Guard, (req, res) => {
    res.render('markets');
})
APP.get('/markets/:marketname', Guard, (req, res) => {
    var MarketName = req.params.marketname;
    res.render('marketdetail', {
        MarketName
    })
})