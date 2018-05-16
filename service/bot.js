const bittrexModule = require('./bittrex');
var botAnalytic = require('./bot/bot_analytic');
const getConfig = require('../middleware/GetConfig');
class Bot {
    constructor() {

    }
    async listen() {
        var config = await getConfig();
        await this.getData();
        setTimeout(async() => {
            await this.listen();
        }, config.time * 1000)
    }

    async ProtectWallet() {
        
        var Cron = async () => {
            console.log('protecting ')
            var config = await getConfig();
            var listMarket = await  bittrexModule.getLiveMarket();
            var Markets = []
            listMarket.map(record => {
                Markets.push(`BTC-${record.Currency}`)
            });
            await botAnalytic.ProtectMarket(Markets);
            setTimeout(async () => {
                await Cron()
            }, config.time * 1000)
        }
        Cron();
    }
    
    async getData() {
        try {
        console.log('freshing')
        var listMarket = await bittrexModule.getTopMarket('BTC');
         await botAnalytic.saveLog(listMarket);
        } catch(err) {
            console.log('error in get data',err)
        }
    }
}
const bot = new Bot();
module.exports = bot;
