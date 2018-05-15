const Gdax = require('gdax');
const CryptoJS = require('crypto-js');
const request = require('request');
const event = require('events');
const axios = require('axios');
const toFixDown = require('../helpers/tofixdown');

class GdaxM  {
    constructor() {
        this.eventEmitter = new event();
        this.bid = 0;
        this.ask = 0;
        this.lastBidAsk = {
        }
    }
    get() {
        return {
            bid: this.bid, ask:this.ask
        }
    }
    async checkPriceChange() {
        var config = await this.getConfig();
        var nowPrice = await this.get();
        if(config.position<=1) {
            if(config.side == 'buy') {
                if(this.lastBidAsk.bid != nowPrice.bid) {
                    console.log('changed price bid',nowPrice.bid, this.lastBidAsk.bid)
                    return true;
                } else {
                    console.log('same price bid', nowPrice.bid, this.lastBidAsk.bid)
                    return false;
                }
            } else {
                if(Number(this.lastBidAsk.ask) != Number(nowPrice.ask)) {
                    console.log('changed price ask', nowPrice.ask, this.lastBidAsk.ask)
                    return true;
                } else {
                    console.log('same price ask', nowPrice.ask, this.lastBidAsk.ask)
                    return false;
                }
            }
        } else {
            if(config.side == 'buy') {
                if(this.lastBidAsk.bid >= nowPrice.bid && this.lastBidAsk.bid > 0) {
                    console.log('still have a great buy price', nowPrice.bid, this.lastBidAsk.bid)
                    return false;
                } else {
                    console.log('buy price is high now', nowPrice.bid, this.lastBidAsk.bid)
                    return true;
                }
            } else {
                if(this.lastBidAsk.ask <= nowPrice.ask && this.lastBidAsk.ask > 0) {
                    console.log('still have good sell price. higher', nowPrice.ask, this.lastBidAsk.ask)
                    return false;
                } else {
                    console.log('sell price is low now', nowPrice.ask, this.lastBidAsk.ask)
                    return true;
                }
            }
        }
    }
    start() {
        setInterval(async () => {
            const config = await this.getConfig();
            if(config.position <=1 ) {
                this.listen()
            } else {
                this.listen50()
            }
               
        }, 350)
        this.eventEmitter.on('ping', async data => {
            var config  = await this.getConfig();
            //console.log(data)
            var bidsData = data.bids[config.position-1]
            if(bidsData) {
                this.bid = bidsData[0]
            } else {
                this.bid = 0
            }
            
            
            var asksData = data.asks[config.position-1]
            if(asksData) {
                this.ask = asksData[0]
            } else {
                this.ask = 0;
            }
        })
    }
    async listen() {
        try {
            var config = await this.getConfig();
            var response = await axios.get(`${config.urlendpoint}/products/${config.market}/book?level=1`);
                if(response.status) {
                    var data = response.data;
                    this.eventEmitter.emit('ping', data)
                }
        } catch(err) 
        {
        }
    }

    async listen50() {
        try {
            var config = await this.getConfig();
            var response = await axios.get(`${config.urlendpoint}/products/${config.market}/book?level=2`);
                if(response.status) {
                    var data = response.data;
                    this.eventEmitter.emit('ping', data)
                }
        } catch(err) 
        {
        }
    }
    async getConfig() {
        return new Promise(async resolve => {
            const config = await model.Config.findOne({
                raw: true
            });
            resolve(config)
        })
    }
    async getAuth() {
        return new Promise(async resolve => {
            var config = await this.getConfig();
            const authedClient = new Gdax.AuthenticatedClient(
                config.key,
                config.secret,
                config.passphrase,
                config.urlendpoint
              );
            resolve(authedClient)
        })
    }

    async getBalance() {
        return new Promise(async (resolve, reject) => {
           
            try {
                var auth = await this.getAuth();
            var data = await auth.getAccounts();
            resolve(data)
            } catch(err) {
                reject(err)
            }
        })
    }

    getOrders(auth, market, side) {
        return new Promise(async resolve => {
            var response = await auth.getOrders({
                status:'open',
                product_id: market,
                side: side
            });
            resolve(response)
        })
    }
    async placeOrder(funds, market , side, type, extracents) {
        var auth = await this.getAuth();
        var response  = null;
        if(type == 'taker') {
            response =  await this.placeMarketOrder(auth, funds, market, side)
        } else {
            response = await this.placeLimitOrder(auth, funds, market, side, extracents)
        }
        return response;
    }
    async CancelAllOrder() {
        var auth = await this.getAuth();
        var config = await this.getConfig();
        await auth.cancelAllOrders({
            product_id: config.market,
            side: config.side
        });
        return;
    }
    async placeMarketOrder(auth, funds, market, side) {
        var params = {}
        if(side =='sell') {
             params = {
                side: 'sell',
                size: funds,
                type:'market', // USD
                product_id: market,
            }
        } else {
             params = {
                side: 'buy',
                funds: funds,
                type:'market', // USD
                product_id: market,
            }
        }
        var response = await auth.placeOrder(params);
        console.log(response)
        return response;
    }

    async placeLimitOrder(auth, funds ,market, side, extracents) {
        var params = {}
        if(side =='sell') {
            var nowPrice = this.get()
            this.lastBidAsk= {
                ask: Number(nowPrice.ask) - extracents,
                bid: nowPrice.bid
            }
            console.log('init new price', nowPrice)
            var sellPrice = Number(nowPrice.ask) - extracents
            
            if (sellPrice > 0) {
                params = {
                    side: 'sell',
                    size: funds,
                    post_only: true,
                    price: sellPrice,
                    type:'limit', // USD
                    product_id: market,
                }
                var response = await auth.placeOrder(params);
                return response;
            } else return {}
        } else {
            var nowPrice = this.get()
            this.lastBidAsk = {
                bid: Number(nowPrice) + extracents,
                ask: nowPrice.ask
            }
            var buyPrice = Number(nowPrice.bid) + extracents
            
            if(buyPrice > 0) {
                params = {
                    side: 'buy',
                    size: toFixDown(funds/buyPrice, 2),
                    price: buyPrice,
                    post_only: true,
                    type:'limit', // USD
                    product_id: market,
                }
                var response = await auth.placeOrder(params);
                return response;
            } else return {}
        }
    }
}
gdax = new GdaxM();
const params = {
    side: 'sell',
    size: '1',
    type:'market', // USD
    product_id: 'ETH-USD',
  };

module.exports = gdax;