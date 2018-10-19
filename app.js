const app = require('./vendor/app.module');
const processUsage = require('./middleware/performance');
app.startServer({
    port: 80,
    callback: async function () {
        console.log(await processUsage.getUsageNow())
    }
});