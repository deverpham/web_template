const express = require('express')
const marketController = require('../../controller/api/market.controller');
var router = express.Router();

router.get('/btchighvolume', Guard, async (req, res) => {
    var results = await marketController.get10BtcHighVolume();
    res.success(results)
})

module.exports =router;