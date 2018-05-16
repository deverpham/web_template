const express = require('express')
const marketController = require('../../controller/api/market.controller');
var router = express.Router();

router.get('/btchighvolume', Guard, async (req, res) => {
    var results = await marketController.get10BtcHighVolume();
    res.success(results)
})

router.get('/:marketname/history', Guard, async(req, res) => {
    var data = await marketController.getMarketHistory(req.params.marketname);
    res.success(data);
})

router.get('/aimarket', Guard, async(req, res) => {
  var result = await marketController.getAImarket();
  res.success(result);
})

router.get('/mymarket', Guard, async(req, res) => {
    var myMarket = await marketController.getMyMarket();
    res.success(myMarket)
})
module.exports =router;
