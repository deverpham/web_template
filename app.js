const app = require('./vendor/app.module');
const WhenStartApp = require('./middleware/whenstartapp');
app.startServer(async () => {
    WhenStartApp.init();
});