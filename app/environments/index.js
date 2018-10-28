const env = process.env.env;

module.exports = (function () {
    switch (env) {
        default:
            {
                const cf = require('./dev.env');
                return cf;
            }
        case 'prod':
            {
                return require('./prod.env')
            }
        case 'staging':
            {
                return require('./staging.env')
            }
    }
}())