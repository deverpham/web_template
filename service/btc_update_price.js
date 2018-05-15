const axios  = require('axios');
class BtcUpdatePrice {
    constructor() {
        this.last = 0;
    }
    listen() {
        setInterval(() => {
            this.getUSD();
        }, 3000)
    }
    async getUSD() {
        var response = await axios.get('https://blockchain.info/ticker');
        var data = response.data;
        this.last = data.USD.last;
    }
    btc2USD(amount) {
        return (Number(amount)* Number(this.last)).toFixed(2);
    }
}
var btcPrice = new BtcUpdatePrice();
module.exports = btcPrice;
