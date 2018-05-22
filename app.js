const app = require('./vendor/app.module');
//const WhenStartApp = require('./middleware/whenstartapp');
const processUsage = require('./middleware/performance');
app.startServer(async () => {
    /*processUsage().then(result => {
        console.log(result)
    })*/
    var PROCESS_USAGE = await processUsage.getUsageNow();
    console.log(PROCESS_USAGE)
    //WhenStartApp.init();
});